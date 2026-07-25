import { useState, useEffect } from 'react'
import { supabase } from '../Client'
import './PostInputForm.css'

/* Parts of postDetails:
    Category, title, species, thumbnail, content
*/

const PostInputForm = ({postDetails, setPostDetails, databaseFunction, submitText}) => {

    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleChange = (event) => {
        const {name, value} = event.target
        setPostDetails((prevState) => {
            return {
                ...prevState,
                [name]:value
            }
        })
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value)
        handleChange(event)
    }

    const finalPost = async (event) => {
        event.preventDefault()
        if (postDetails.title.replace(/\s/g).length < 4) {
            alert("Your title must have at least 4 non-whitespace characters!")
            return
        }
        
        await databaseFunction({category: postDetails.category, title: postDetails.title, species: postDetails.species, thumbnail: postDetails.thumbnail, content: postDetails.content, password: postDetails.password})
        
        window.location = "/"
    }

    useEffect(() => {
        setSelectedCategory(postDetails.category)
    }, [postDetails.category])

    return (
        <form className="input-form glass1">

            <div className="option-container">
                <label htmlFor="category">
                    <h3>Category</h3>
                </label>

                <li className="category-list" key="categories">
                    <div className="category-option">
                        <input
                        id="Post"
                        name="category"
                        type="radio"
                        value="Post"
                        onChange={handleCategoryChange}
                        checked={selectedCategory == "Post"}
                        />
                        <label htmlFor="Post">
                            <h2>Post</h2>
                        </label>
                    </div>
                    <div className="category-option">
                        <input
                        id="Sighting"
                        name="category"
                        type="radio"
                        value="Sighting"
                        onChange={handleCategoryChange}
                        checked={selectedCategory == "Sighting"}
                        />
                        <label htmlFor="Sighting">
                            <h2>Sighting</h2>
                        </label>
                    </div>
                </li>
            </div>

            <div className="option-container">
                <label htmlFor="title">
                    <h3>Title</h3>
                </label>
                <textarea className="title-input" id="title" name="title" maxLength="80" required placeholder="Type here..." value={postDetails.title} onChange={handleChange} />
            </div>

            <div className="option-container">
                <label htmlFor="content">
                    <h3>Content</h3>
                </label>
                <textarea className="content-input" id="content" name="content" maxLength="600" required value={postDetails.content} placeholder="Type here..." onChange={handleChange} />
            </div>

            <input className="small-btn" type="submit" value={submitText} onClick={finalPost}/>
        </form>
    )
}

export default PostInputForm