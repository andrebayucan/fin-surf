import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { supabase } from '../Client'
import PostInputForm from '../components/PostInputForm'
import DeleteBtn from '../components/DeleteBtn'

const EditPost = () => {

    const {id} = useParams()

    const [post, setPost] = useState({
        category: "",
        title: "",
        species: [],
        thumbnail: "",
        content: "",
        password: ""
    })

    const updateDatabasePost = async (finalPostDetails) => {
        const localDate = new Date()
        localDate.toISOString()

        finalPostDetails.edited_at = localDate
        
        await supabase
        .from("Posts")
        .update(finalPostDetails)
        .eq("id", id)
    }

    useEffect(() => {
        const fetchDetails = async () => {
            const {data} = await supabase
            .from("Posts")
            .select()
            .eq("id", id)
            .single()

            setPost({
                category: data.category,
                title: data.title,
                species: data.species,
                thumbnail: data.thumbnail,
                content: data.content,
                password: data.password
            })
        }

        fetchDetails().catch(console.error)
    }, [])
    
    return (
        <>
            <DeleteBtn id={id} />
            <PostInputForm postDetails={post} setPostDetails={setPost} databaseFunction={updateDatabasePost} submitText="Update"/>
        </>
    )
}

export default EditPost