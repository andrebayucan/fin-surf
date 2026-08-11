import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { supabase } from '../Client'
import { translateDate } from '../Helpers'
import LinkBtn from '../components/LinkBtn'
import LikeBtn from '../components/LikeBtn'
import Image from '../components/Image'
import CommentSection from '../components/CommentSection'
import './PostPage.css'

const PostPage = () => {

    const {id} = useParams()
    const [comments, setComments] = useState([])
    const [post, setPost] = useState({
        created_at: "",
        edited_at: "",
        category: "",
        title: "",
        species: [],
        thumbnail: {},
        content: "",
        password: "",
        comments: [],
        likes: 0
    })

    useEffect(() => {
        const fetchDetails = async () => {
            const {data} = await supabase
            .from("Posts")
            .select()
            .eq("id", id)
            .single()

            setPost({
                created_at: translateDate(data.created_at),
                edited_at: translateDate(data.edited_at),
                category: data.category,
                title: data.title,
                species: data.species,
                thumbnail: data.thumbnail,
                content: data.content,
                password: data.password,
                comments: data.comments,
                likes: data.likes
            })

        }

        fetchDetails().catch(console.error)
    }, [id])

    return (
        <div className="post-page glass medium-padding">
            <div className="page-top">
                <div className="page-dates">
                    <p>Creation Date: {post.created_at}</p>
                    {post.edited_at ? <p>Last Edited: {post.edited_at} </p> : ""}
                </div>
                <div className="top-btns">
                    <LikeBtn id={id} initialLikes={post.likes} />
                    <LinkBtn path={`/edit/${id}`} image="/padlock.png" alt="A lock icon." text="Edit"/>
                </div>
            </div>
            <div className="page-species">
                
            </div>
            <div className="page-content">
                <Image src={post.thumbnail.image} alt={post.thumbnail.name} />
                <h1>{post.title}</h1>
                <h2>{post.content}</h2>
            </div>

            <CommentSection id={id} />
        </div>
    )
}

export default PostPage