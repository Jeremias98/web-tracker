import { Torrent } from "../models/torrent";

export const getStats = async (): Promise<Torrent[]> => {
    return new Promise<Torrent[]>(async (resolve) => {
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            if(xhr.responseText === "no torrents data")
                alert("no torrents data")
            else{
                console.log(xhr.responseText)
                console.log(JSON.parse(xhr.responseText))                
                resolve(JSON.parse(xhr.responseText))
            }

        })
        // open the request with the verb and the url
        xhr.open('GET', 'http://127.0.0.1:5001/stats')
        // send the request
        xhr.send()
    
        /*resolve([
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
        );*/
    });
}