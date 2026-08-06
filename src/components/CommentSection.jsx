import { useState, useEffect } from 'react'
import { supabase } from '../Client'
import { getCurrentDate } from '../Helpers'
import FilterBar from './FilterBar'
import Comment from './Comment'
import './CommentSection.css'

const CommentSection = ({id}) => {

    const [commentInput, setCommentInput] = useState("")
    const [currentComments, setCurrentComments] = useState([])
    const [loaded, setLoaded] = useState(false)

    const handleCommentChange = (event) => {
        setCommentInput(event.target.value)
    }
    
    const getComments = async () => {
        const {data} = await supabase
        .from("Posts")
        .select("comments")
        .eq("id", id)
        .single()

        if (data && data.comments)
            return [...data.comments].sort((a, b) => b.created_at.localeCompare(a.created_at)) 
        else
            return []
    }

    const postComment = async (event) => {
        event.preventDefault()
        
        const updatedComments = [
            {text: commentInput, created_at: getCurrentDate()},
            ...(await getComments())
        ]

        const {data} = await supabase
        .from("Posts")
        .update({comments: updatedComments})
        .eq("id", id)

        setCurrentComments(updatedComments)
    }

    useEffect(() => {
        const fetchComments = async () => {
            setCurrentComments(await getComments())
        }

        fetchComments().catch(console.error)
    }, [])

    const scrollTo = (hashId) => {
            const target = document.querySelector(hashId)
    
            if (target != null)
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
        }
    
    useEffect(() => {
        if (!loaded && location.hash != "" && document.readyState == "complete") {
            scrollTo(location.hash)
            setLoaded(true)
        }
    }, [currentComments])

    return (
        <div id="comments" className="comment-section">
            <form className="comment-form-container" onSubmit={postComment}>
                <label htmlFor="comment-input">
                    <h3>Write a Comment</h3>
                </label>
                <textarea
                    id="comment-input"
                    name="comments"
                    maxLength="250"
                    required
                    value={commentInput}
                    placeholder="Type here..."
                    onChange={handleCommentChange}
                />

                <input
                    className="small-btn"
                    type="submit"
                    value="Comment"
                />
            </form>
            <div className="comments">
                {
                    currentComments && currentComments.length > 0 ?
                    currentComments.map((comment, index) => {
                        return (
                            <Comment
                                content={comment.text}
                                date={comment.created_at}
                            />
                        )
                    })
                    :
                    ""
                }
            </div>
        </div>
    )
}

export default CommentSection