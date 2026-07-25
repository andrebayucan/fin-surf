import { useState, useEffect } from 'react'
import { supabase } from '../Client'
import Post from '../components/Post'
import './ReadPosts.css'

const ReadPosts = () => {

    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase
            .from("Posts")
            .select()
            .order("created_at", {ascending : false})

            setPosts(data)
        }

        fetchPosts().catch(console.error)
    }, [])

    return (
        <div className="posts-container">
            {posts && posts.length > 0 ? 
            [...posts].map((post, index) => {
                return (
                    <Post
                    id={post.id}
                    date={post.created_at}
                    title={post.title}
                    species={post.species}
                    thumbnail={post.thumbnail}
                    content={post.content}
                    comments={post.comments}
                    password={post.password}
                    />
                )
            }) :
            "No posts!"
            }
        </div>
    )
}

export default ReadPosts