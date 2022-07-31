import { Torrent } from "../models/torrent";

export const getStats = async (): Promise<Torrent[]> => {
    return new Promise<Torrent[]>((resolve) => {
        resolve(getMockedTorrents(10));
    });
}

const getMockedTorrents = (quantity: number): Torrent[] => {
    let torrents: Torrent[] = [];
    let initialDate: Date = new Date();
    initialDate.setHours(initialDate.getHours() - quantity);
    [...Array(quantity)].forEach((_, n) => {
        torrents.push({
            infoHash: ("INFO_HASH_" + n),
            added: new Date(initialDate),
            peers: [
                {
                    peerId: "PEER_ID_1",
                    ip: "192.168.0.1",
                    port: 8080,
                    uploaded: 0,
                    downloaded: 0,
                    left: 0,
                    registered: new Date(initialDate)
                }
            ]
        });
        initialDate.setHours(initialDate.getHours() + 1);
    });

    return torrents;
}