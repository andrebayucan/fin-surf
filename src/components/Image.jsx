import { useState, useEffect } from 'react'
import './Image.css'

const Image = ({src, alt, className=""}) => {

    const [invalid, setInvalid] = useState(false)
    const [currentThumbnail, setCurrentThumbnail] = useState("/image-placeholder.png")
    const [currentAlt, setCurrentAlt] = useState("A white question mark in a green circle representing an unavailable image.")
    
    const invalidateImage = () => {
        console.log("bad")
        setInvalid(true)
        setCurrentThumbnail("/image-placeholder.png")
        setCurrentAlt("A white question mark in a green circle representing an unavailable image.")
    }
    
    useEffect(() => {
        if (!src)
            return

        setInvalid(false)
        setCurrentThumbnail(src)
        setCurrentAlt(alt)
    }, [src, alt])

    return (
        <img className={"image "+ (invalid ? "square contain-fit" : className)} src={currentThumbnail} alt={currentAlt} onError={invalidateImage} />
    )
}

export default Image