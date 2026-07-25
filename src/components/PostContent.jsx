import { useState, useEffect } from 'react'
import { translateDate } from '../Helpers'
import './PostContent.css'

const PostContent = (props) => {
    const [currentThumbnail, setCurrentThumbnail] = useState(null)

    useEffect(() => {
        setCurrentThumbnail(props.thumbnail)
    }, [])

    return (
        <div className="post-content">
            <img className="thumbnail" src={currentThumbnail || "/image-placeholder.png"} alt="A white question mark in a green circle representing an unavailable image." onError={() => {setCurrentThumbnail("/image-placeholder.png")}} />
            <div className="post-details">
                <div className="basic-details">
                    <h3>{props.title}</h3>
                    <h2>{translateDate(props.date)}</h2>
                </div>
                <div className="description-container">
                    <p>{props.content}</p>
                </div>
            </div>
        </div>
    )
}

export default PostContent