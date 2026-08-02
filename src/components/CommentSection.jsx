import { useState, useEffect } from 'react'
import { supabase } from '../Client'
import { getCurrentDate } from '../Helpers'
import FilterBar from './FilterBar'
import Comment from './Comment'
import './CommentSection.css'

const CommentSection = ({id}) => {

    const [commentInput, setCommentInput] = useState("")
    const [currentComments, setCurrentComments] = useState([])

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
            return data.comments
        else
            return []
    }

    const postComment = async () => {
        event.preventDefault()
        
        const updatedComments = [
            ...(await getComments()),
            {text: commentInput, created_at: getCurrentDate()}
        ]

        const {data} = await supabase
        .from("Posts")
        .update({comments: updatedComments})
        .eq("id", id)

        window.location.reload()
    }

    useEffect(() => {
        const fetchComments = async () => {
            const {data} = await supabase
            .from("Posts")
            .select("comments")
            .eq("id", id)

            if (data || data[0].comments.length > 0)
                setCurrentComments(data[0].comments)
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
        if (location.hash != "" && document.readyState == "complete")
            scrollTo(location.hash)
    }, [currentComments])

    return (
        <div id="comments" className="comment-section">
            <form className="comment-form-container">
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
                    onClick={postComment}
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