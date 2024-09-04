import { createCuid } from "@/utilities/use-cuid";
import { randomBytes } from "crypto";

import type { Password, User } from "@prisma/client";
export interface PublicKeyCredentialRpEntity {
	rp: string;
}
export enum AuthenticatorTransport {
	Usb = "usb",
	Nfc = "nfc",
	Ble = "ble",
	Internal = "internal",
}
export enum UserVerificationRequirement {
	Required = "required",
	Preferred = "preferred",
	Discouraged = "discouraged",
}
export interface PublicKeyCredentialParameters {}
export interface PublicKeyCredentialUserEntity {
	user: string;
}
export interface PublicKeyCredentialCreationOptions
	extends PublicKeyCredentialRpEntity,
		PublicKeyCredentialUserEntity {
	challenge: Buffer;
}
interface Message {
	id: string;
	isAnonymous: boolean;
	firstName: string;
	lastName: string;
	email: string;
}

type InputMode =
	| "none"
	| "text"
	| "decimal"
	| "numeric"
	| "tel"
	| "search"
	| "email"
	| "url";

function assertIsInputMode(value: string): asserts value is InputMode {
	const validInputModes = new Set([
		"none",
		"text",
		"decimal",
		"numeric",
		"tel",
		"search",
		"email",
		"url",
	]);

	if (!validInputModes.has(value as InputMode)) {
		throw new Error(
			`Invalid inputMode: ${value}. Must be one of: ${[...validInputModes].join(", ")}`,
		);
	}
}

export function setInputMode(mode: string) {
	assertIsInputMode(mode);
	return mode;
}

export type ExternalContact = Message & {
	message: string;
};
export const defExternalContact = (): ExternalContact => ({
	...createCuid(),
	firstName: "",
	lastName: "",
	email: "",
	message: "",
	isAnonymous: true,
});
const prisma = {
	user: {
		async create(user: User) {
			console.log(user);
		},
	},
	message: {
		async create(msg: ExternalContact) {
			console.log(msg);
			return msg;
		},
	},
};
export const sendContactInformation = async (
	contact: ExternalContact,
): Promise<ExternalContact | Error> => {
	"use server";
	return prisma.message
		.create(contact)
		.then((r) => r)
		.catch((e) => e);
};

export const createChallenge = (size?: number) => {
	"use server";
	const challenge = randomBytes(
		typeof size === "number" && size < 400 ? size : 64,
	);
	prisma.user.create({ challenge });
};
export const registerCredential = () => {};
// $_REQUEST['PHPSESSID']
// PublicKeyCredentialCreationOptions.pubKeyCredParams
