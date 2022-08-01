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