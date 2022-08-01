import { Peer } from "../models/peer";
import { Torrent } from "../models/torrent";

export const getStats = async (): Promise<Torrent[]> => {
    return new Promise<Torrent[]>(async (resolve) => {
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            if(xhr.responseText === "no torrents data")
                alert("no torrents data")
            else{
                console.log(JSON.parse(xhr.responseText))
                resolve(JSON.parse(xhr.responseText))
            }

        })

        xhr.open('GET', 'http://127.0.0.1:5001/stats')
        xhr.send()
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
            peers: getPeersMock(getRandomInt(5, 10), initialDate)
        });
        initialDate.setHours(initialDate.getHours() + 1);
    });

    return torrents;
}

const getPeersMock = (quantity: number, initialDate: Date): Peer[] => {
    let peers: Peer[] = [];
    [...Array(quantity)].map((_, n) => {
        initialDate.setHours(getRandomInt(0, 23))
        peers.push({
            peerId: "PEER_ID_1",
            ip: "192.168.0.1",
            port: 8080,
            uploaded: 0,
            downloaded: 0,
            left: 0,
            registered: new Date(initialDate)
        })
    });
    return peers;
};

const getRandomInt = (min: number, max: number) => {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}