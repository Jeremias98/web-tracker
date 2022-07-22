export type Peer = {
    peerId: string | null;
    ip: string;
    port: number;
    uploaded: number;
    downloaded: number;
    left: number;
    registered: Date;
};