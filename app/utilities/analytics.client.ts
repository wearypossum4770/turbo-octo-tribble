export const install = (callback: EventListenerOrEventListenerObject) =>
	window.addEventListener("unhandledrejection", callback);
export const redactString = "REDACTED";
export const uninstall = (callback: EventListenerOrEventListenerObject) =>
	window.removeEventListener("unhandledrejection", callback);

export interface Privacy {
	sanitizerInput: boolean;
	isEnabled: boolean;
}
const sensitiveDataKeys = new Set(["x-auth-token", "ssn", "password"]);
export type AnalyticsConfig = Privacy;

export class Analytics implements Privacy {
	sanitizerInput: boolean;
	isEnabled: boolean;
	captureException(err: Error) {
		console.log(err);
	}
	requestSanitizer(request: Response | Request) {
		request.headers.forEach((_, key) => {
			if (sensitiveDataKeys.has(key.toLowerCase())) {
				request.headers.set(key, redactString);
			}
		});
	}
	init({ sanitizerInput, isEnabled }: Partial<AnalyticsConfig>) {
		// isAuthenticated
		if (typeof sanitizerInput !== "undefined")
			this.sanitizerInput = sanitizerInput;
		if (typeof isEnabled !== "undefined") this.isEnabled = isEnabled;
		return this;
	}
}

export const createAnalytics = (config: AnalyticsConfig) =>
	new Analytics().init(config);

const rocket = createAnalytics({ sanitizerInput: true, isEnabled: true });

console.log(rocket);
