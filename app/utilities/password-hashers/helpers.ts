import { createWriteStream } from 'node:fs';


export type EnhancedError = {
	extra: string,
}
const range = "The length of the password is too large";
const message =
	"Too many characters, please remove some characters and try again.";
export const DEFAULT_SALT_ROUNDS = 10;
export const logFile = "app/logs/password_errors.log";
export const errorMessage = ({ name, stack, message, cause}: Error, init: EnhancedError) =>`
${JSON.stringify({
	...init, name, stack, message, cause,
	dateStarted: performance.timeOrigin,
})}
`
export const logger = createWriteStream("app/logs/password_errors.log", { flags: "a" });

export class PasswordTooLargeError extends Error {
	constructor() {
		super(message, { cause: new RangeError(range) });
	}
}
export const passwordPresenceGuard = (password: string): password is string => {
	console.log(password.trim().length);
	if (password.trim().length === 0)
		throw new Error(`${Date.now()}|Empty String Received|`);
	return true;
};

export const passwordTypeGuard = (password: unknown): password is string => {
	if (
		password === null ||
		typeof password === "undefined" ||
		typeof password !== "string"
	)
		throw new Error(`${Date.now()}|No Value Given|`);
	return true;
};

export const passwordBufferGuard = (buffer: Buffer): buffer is Buffer => {
	if (buffer.byteLength > 72) throw new PasswordTooLargeError();
	return true;
};

export const wrapper = (fn: CallableFunction) => (...args: unknown[]) => {
	const { length, name } = fn
	return fn(...args, length, name)
}