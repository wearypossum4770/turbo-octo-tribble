export interface Broadcast {
	id: string;
}
export enum ChannelPresence {}
export interface Schedule {
	id: string;
	cron: string;
}
export interface Channel {
	presence: ChannelPresence;
}

export interface InboundEmail {
	id: string;
}
