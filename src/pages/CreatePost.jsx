import { useState } from 'react'
import { supabase } from '../Client'
import PostInputForm from '../components/PostInputForm'
import './CreatePost.css'


const CreatePost = () => {

    const [post, setPost] = useState({
        category: "Post",
        title: "",
        species: [],
        thumbnail: "",
        content: "",
        password: ""
    })

    const createDatabasePost = async (finalPostDetails) => {
        await supabase
        .from("Posts")
        .insert(finalPostDetails)
        .select()
    }
    
    return (
        <PostInputForm postDetails={post} setPostDetails={setPost} databaseFunction={createDatabasePost} submitText="Post"/>
    )
}

export default CreatePost