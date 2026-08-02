import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { supabase } from '../Client'
import Post from '../components/Post'
import FilterBar from '../components/FilterBar'
import './ReadPosts.css'

const ReadPosts = () => {

    const [params] = useSearchParams()
    const page = params.get("page")
    const size = params.get("size")
    const contains = params.get("contains")
    const sortType = params.get("sort_type")
    const orderBy = params.get("order_by")

    const [posts, setPosts] = useState(null)
    const [filters, setFilters] = useState({
        results: Number(size) || 10,
        page: Number(page) || 1,
        text: contains || "",
        category: "Sighting",
        orderBy: orderBy || "descending",
        sortType: sortType || "date"
    })

    const stringToBool = (str) => {
        if (str == "ascending")
            return true
        else
            return false
    }
    
    useEffect(() => {
        const fetchPosts = async () => {
            let query = supabase
            .from("Posts")
            .select()
            .ilike("title", `%${filters.text}%`)


            if (filters.sortType == "date")
                query = query.order("created_at", {ascending : stringToBool(filters.orderBy)})
            else if (filters.sortType == "likes")
                query = query.order("likes", {ascending : stringToBool(filters.orderBy)})

            const maxIndex = (filters.results * filters.page) - 1
            const minIndex = maxIndex - (filters.results - 1)
            query = query.range(minIndex, maxIndex)

            const {data} = await query
            setPosts(data)
        }

        fetchPosts().catch(console.error)
    }, [filters])

    return (
        <>
            <FilterBar initialFilters={filters} />
            <div className="posts-container">
                {posts && posts.length > 0 ? 
                [...posts].map((post, index) => {
                    return (
                        <Post
                            key={post.id}
                            id={post.id}
                            category={post.category}
                            date={post.created_at}
                            title={post.title}
                            species={post.species}
                            thumbnail={post.thumbnail}
                            password={post.password}
                            content={post.content}
                            initialLikes={post.likes}
                            comments={post.comments}
                        />
                    )
                }) :
                "No posts!"
                }
            </div>
        </>
    )
}

export default ReadPosts