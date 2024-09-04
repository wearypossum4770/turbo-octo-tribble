export enum AlgorithmType {
	None,
	Sha256,
	Hs256,
}

export enum VerificationType {
	TimeBasedEphemeralCode,
	TimeBasedEphemeralPassword,
	TimeBasedEphemeralLink,
	EphemeralCode,
	EphemeralPassword,
	EphemeralLink,
}
export interface EnhancedEvent {
	action: string;
	actor: string;
	dateCreated: Date | number | string;
	sysTime: Date | number | string;
	dateReceived: Date | number | string;
}
export interface Span {
	id: string;
}
export interface TraceStatus {
	code: string;
	message: string;
}
export interface Service {
	name: string;
}
export interface Trace {
	id: string;
	spanId: Span;
	status: TraceStatus;
	parentSpanId: Span;
	name: string;
	time: string;
	service: Service;
	duration: number;
	error: boolean;
	attributes: Record<string, string>;
	events: Record<string, string>[];
	links: string | URL[];
	resource: Record<string, string>[];
}
export interface PullRequest extends EnhancedEvent {
	state: string;
}
export interface MultiFactorAuthentication {
	type: VerificationType;
	code: string;
	id: string;
}
