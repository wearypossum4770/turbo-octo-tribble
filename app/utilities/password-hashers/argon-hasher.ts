import argon2 from "argon2";

import type { UnAuthenticatedUser } from "@/models/user.server";
import {
	passwordPresenceGuard,
	passwordTypeGuard,logger,errorMessage,
	passwordBufferGuard,
} from "@/utilities/password-hashers/helpers";

export const passwordError = (err: unknown) =>
	err instanceof Error ? err.message : "";
export const logFile = "app/logs/password_errors.log";

// ERR_INVALID_BUFFER_SIZE

/**
 * dateStarted: Date|string|number,
 * dateReceived: Date|string|number,
 * passwordLength? number,
 * remoteAddress: string|URL,
 * method: string,
 * httpVersion: string,
 * referrer: string,
 * agent: string,
 *
 */
export const hybridArgonConfig = {
	type: argon2.argon2id,
	memoryCost: 2 ** 16, // 64 MiB
	timeCost: 4, // 4 iterations (adjust based on your system performance)
	parallelism: 1, // Number of threads to use
};

export const hashPassword = async (
	password?: string,
): Promise<string | null> => {
	"use server";
	try {
		if (passwordTypeGuard(password)) {
			passwordPresenceGuard(password);
			passwordBufferGuard(Buffer.from(password));
			return await argon2.hash(password, hybridArgonConfig);
		}
	} catch (error) {
		logger.write(
			errorMessage(`Error hashing password: ${passwordError(error)}\n`),
		);
		return null;
	}
	return null;
};

export const verifyPassword = async ({
	hash,
	password,
}: UnAuthenticatedUser): Promise<boolean> => {
	try {
		return await argon2.verify(hash, password);
	} catch (error) {
		logger.write(
			errorMessage(`Error verifying password: ${passwordError(error)}\n`),
		);
		return false;
	}
};
