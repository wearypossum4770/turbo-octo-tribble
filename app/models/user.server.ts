import { randomBytes } from "crypto";

import { createId } from "@paralleldrive/cuid2";
import type { Password, User } from "@prisma/client";

import {
	hashPassword,
	verifyPassword,
} from "@/utilities/password-hashers/argon-hasher";
import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export type AuthenticatedUser = {
	id?: string;
};
export type PreRegisteredUser= {
	password: string,
}
export type UnAuthenticatedUser = PreRegisteredUser & {
	hash: string;
};
export type AnonymousUser = {
	isAnonymous: boolean;
};
export interface UnregisteredUser extends User {
	password: string;
}

export const generateRandomChallenge = (size?: number) =>
	randomBytes(typeof size === "number" && size < 400 ? size : 64);

export async function getUserById(id: User["id"]) {
	return prisma.user.findUnique({ where: { id } });
}
export const getUserObjectById = ({ id }: AuthenticatedUser) =>
	typeof id !== "undefined" && prisma.user.findUnique({ where: { id } });

export const getUserObjectByEmail = ({ email }: User) =>
	prisma.user.findUnique({ where: { email } });

export const createUserObject = async ({
	password,
	email,
}: Partial<UnregisteredUser>) => {
	const userId = createId();
	if (
		typeof email === "undefined" ||
		email === null ||
		typeof email !== "string"
	)
		return { userId };
	return new Promise((resolve) =>
		hashPassword(password)
			.then((hash) =>
				!hash
					? null
					: prisma.user.create({
							data: {
								password: { create: { hash } },
								email,
							},
						}),
			)
			.then((user) =>
				resolve(!user ? { userId } : { userId: user.id ?? userId }),
			),
	);
};

export const getUserByEmail = async (email: User["email"]) =>
	prisma.user.findUnique({ where: { email } });

export async function deleteUserByEmail(email: User["email"]) {
	return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
	email: User["email"],
	password: Password["hash"],
) {
	const userWithPassword = await prisma.user.findUnique({
		where: { email },
		include: {
			password: true,
		},
	});

	if (!userWithPassword || !userWithPassword.password) {
		return null;
	}
	const {
		password: { hash },
		...user
	} = userWithPassword;
	const isValid = await verifyPassword({ password, hash });

	if (!isValid) {
		return null;
	}

	return user;
}
