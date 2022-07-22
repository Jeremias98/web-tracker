import { Peer } from "./peer";

export type Torrent = {
    infoHash: string;
    added: Date;
    peers: Peer[];
};