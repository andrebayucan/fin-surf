import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { supabase } from '../Client'
import PostInputForm from '../components/PostInputForm'
import './CreatePost.css'


const CreatePost = () => {
    
    const {id} = useParams()

    const [post, setPost] = useState({
        category: "Sighting",
        title: "",
        species: [],
        thumbnail: {
            image: null,
            name: ""
        },
        content: "",
        password: "",
        likes: 0
    })

    const createDatabasePost = async (finalPostDetails) => {
        await supabase
        .from("Posts")
        .insert(finalPostDetails)
    }

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(`https://api.obis.org/v3/occurrence?startdate=1500-01-01&id=${id}`)
            const json = await response.json()

            const creature = json?.results[0]
            const additionalInfo = await fetch(`https://api.inaturalist.org/v1/taxa?per_page=1&q=${creature.scientificName}`)
            const infoJson = await additionalInfo.json()
            const creaturePhoto = (infoJson?.results[0]?.default_photo?.medium_url ?? infoJson?.results[0]?.default_photo?.square_url) ?? "/image-placeholder.png"

            setPost({
                category: "Sighting",
                title: creature.scientificName,
                species: [{
                    id: id, name: creature.scientificName
                }],
                thumbnail: {
                    image: creaturePhoto,
                    name: creature.scientificName
                },
                content: "",
                password: ""
            })
        }

        fetchDetails().catch(console.error)
        }, [])
    
    return (
        <PostInputForm postDetails={post} setPostDetails={setPost} databaseFunction={createDatabasePost} submitText="Post"/>
    )
}

export default CreatePost