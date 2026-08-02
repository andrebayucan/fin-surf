import { useState, useEffect } from 'react'
import { supabase } from '../Client'
import { shortenNumber } from '../Helpers'

const LikeBtn = ({id, initialLikes}) => {

    const [likeCount, setLikeCount] = useState(initialLikes)
    const [liked, setLiked] = useState(false)

    const likePost = async (event) => {
        event.preventDefault()

        await supabase
        .from("Posts")
        .update({likes: likeCount + 1})
        .eq("id", id)

        setLiked(true)
        setLikeCount((likeCount) => likeCount + 1)
    }

    return (
        <button className="small-btn" onClick={likePost}>
            <img src="heart.svg" alt="A heart representing a like button." />
            {shortenNumber(likeCount)}
        </button>
    )
}

export default LikeBtn