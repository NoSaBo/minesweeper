import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Meme(props) {
    const [memeUrl, setMeme] = useState(null)

    useEffect(() => {
        const tagWin = props.difficulty === "god" ? "epic" : "celebrate"
        const tagLose = "cry"
        const url = props.didWin
            ? `https://api.giphy.com/v1/gifs/random?api_key=NE2CZKYPQSvRQfbosCF1tTHdDRTmd9Su&tag=${tagWin}`
            : `https://api.giphy.com/v1/gifs/random?api_key=NE2CZKYPQSvRQfbosCF1tTHdDRTmd9Su&tag=${tagLose}`
        axios.get(url)
            .then(data => setMeme(data.data.data.image_url))
            .catch(error => console.log(`error getting gif`, error))
    }, [])

    return <div className={"py-2"}>
        {
            memeUrl
                ? <img alt={"loading"} src={memeUrl} style={{ maxHeight: "60vh", maxWidth: "80vw" }} />
                : <h4 className={"text-muted"}>Loading Meme...</h4>
        }
    </div>
}