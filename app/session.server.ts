import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import type { User, AuthenticatedUser } from "~/models/user.server";
import { getUserById, getUserObjectById } from "~/models/user.server";

invariant(process.env['SESSION_SECRET'], "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "__session",
		httpOnly: true,
		path: "/",
		sameSite: "strict",
		secrets: [process.env['SESSION_SECRET']],
		secure: process.env.NODE_ENV === "production",
	},
});

const USER_SESSION_KEY = "userId";

export const getSessionCookie = ({ headers }: Request) => headers.get("Cookie");

export const getSession = async (request: Request) =>
	sessionStorage.getSession(getSessionCookie(request));

export const getUserFromSession = (
	session: Awaited<ReturnType<typeof getSession>>,
) => session.get(USER_SESSION_KEY);

export const handleSession = (request: Request): Promise<AuthenticatedUser> =>
	getSession(request)
		.then(getUserFromSession)
		.then((id) => ({ id }));

export const getSessionUserId = (
	request: Request,
): Promise<AuthenticatedUser | undefined> => handleSession(request);

export async function getUserId(
	request: Request,
): Promise<User["id"] | undefined> {
	const session = await getSession(request);
	const userId = session.get(USER_SESSION_KEY);
	return userId;
}


export const getUserObject = async (request: Request) => {
	const authUser = await getSessionUserId(request);
	if (typeof authUser === "undefined" || authUser === null) return null;
	const user = await getUserObjectById(authUser);
	if (user) return user;
	throw await logout(request);
};


export async function getUser(request: Request) {
	const userId = await getUserId(request);
	if (userId === undefined || userId === null) return null;

	const user = await getUserById(userId);
	if (user) return user;

	throw await logout(request);
}

export async function requireUserId(
	request: Request,
	redirectTo: string = new URL(request.url).pathname,
) {
	const userId = await getUserId(request);
	if (!userId) {
		const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
		throw redirect(`/login?${searchParams}`);
	}
	return userId;
}

export async function requireUser(request: Request) {
	const userId = await requireUserId(request);

	const user = await getUserById(userId);
	if (user) return user;

	throw await logout(request);
}

export async function createUserSession({
	request,
	userId,
	remember,
	redirectTo,
}: {
	request: Request;
	userId: string;
	remember: boolean;
	redirectTo: string;
}) {
	const session = await getSession(request);
	session.set(USER_SESSION_KEY, userId);
	return redirect(redirectTo, {
		headers: {
			"Set-Cookie": await sessionStorage.commitSession(session, {
				maxAge: remember
					? 60 * 60 * 24 * 7 // 7 days
					: undefined,
			}),
		},
	});
}

export async function logout(request: Request) {
	const session = await getSession(request);
	return redirect("/", {
		headers: {
			"Set-Cookie": await sessionStorage.destroySession(session),
		},
	});
}
