import { Torrent } from "../models/torrent";

export const getStats = async (): Promise<Torrent[]> => {
    return new Promise<Torrent[]>((resolve) => {
        resolve([
            {
                infoHash: "INFO_HASH_1",
                added: new Date(),
                peers: [
                    {
                        peerId: "PEER_ID_1",
                        ip: "192.168.0.1",
                        port: 8080,
                        uploaded: 0,
                        downloaded: 0,
                        left: 0,
                        registered: new Date()
                    },
                    {
                        peerId: "PEER_ID_2",
                        ip: "192.168.0.2",
                        port: 8080,
                        uploaded: 0,
                        downloaded: 0,
                        left: 0,
                        registered: new Date()
                    }
                ]
            },
            {
                infoHash: "INFO_HASH_2",
                added: new Date(),
                peers: [
                    {
                        peerId: "PEER_ID_1",
                        ip: "192.168.0.1",
                        port: 8080,
                        uploaded: 0,
                        downloaded: 0,
                        left: 0,
                        registered: new Date()
                    }
                ]
            }
        ]
        );
    });
}