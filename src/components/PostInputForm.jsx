import { useState, useEffect } from 'react'
import './PostInputForm.css'

const PostInputForm = ({postDetails, setPostDetails, databaseFunction, submitText}) => {

    const [imageOption, setImageOption] = useState(null)
    const [selectedThumbnail, setSelectedThumbnail] = useState(null)

    const handleChange = (event) => {
        const {name, value} = event.target
        setPostDetails((prevState) => {
            return {
                ...prevState,
                [name]:value
            }
        })
    }

    const handleImageOptionChange = (event) => {
        setImageOption(event.target.value)
        handleChange(event)
    }

    const handleThumbnailChange = (event) => {
        const {name, value} = event.target
        setSelectedThumbnail(value)
        setPostDetails((prevState) => {
            return {
                ...prevState,
                [name]:{image: value, name:"Custom image"}
            }
        })
    }

    const finalPost = async (event) => {
        event.preventDefault()
        if (postDetails.title.replace(/\s/g).length < 4) {
            alert("Your title must have at least 4 non-whitespace characters!")
            return
        }
        
        await databaseFunction({
            category: postDetails.category,
            title: postDetails.title,
            species: postDetails.species,
            thumbnail: postDetails.thumbnail,
            content: postDetails.content,
            password: postDetails.password})
        
        window.location = "/"
    }

    useEffect(() => {
        setImageOption("Current")
    }, [])

    return (
        <form className="input-form glass1">
            <div className="option-container">
                <label htmlFor="thumbnail-input">
                    <h3>Thumbnail</h3>
                </label>
                <li className="category-list" id="thumbnail-input">
                    <div className="category-option">
                        <input
                            id="current-option"
                            name="Current"
                            type="radio"
                            value="Current"
                            onChange={handleImageOptionChange}
                            checked={imageOption == "Current"}
                        />
                        <label htmlFor="current-option">
                            <h2>Current</h2>
                        </label>
                    </div>
                    <div className="category-option">
                        <input
                            id="custom-option"
                            name="Custom"
                            type="radio"
                            value="Custom"
                            onChange={handleImageOptionChange}
                            checked={imageOption == "Custom"}
                        />
                        <label htmlFor="custom-option">
                            <h2>Custom</h2>
                        </label>
                    </div>
                </li>
            </div>

            {imageOption == "Custom" ? 
            <textarea
                className="title-input"
                id="thumbnail"
                name="thumbnail"
                required
                placeholder="Custom URL..."
                value={postDetails.thumbnail.image}
                onChange={handleThumbnailChange} />
            :
            ""
            }

            <div className="option-container">
                <label htmlFor="title-input">
                    <h3>Title</h3>
                </label>
                <textarea
                    className="title-input"
                    id="title-input"
                    name="title"
                    maxLength="80"
                    required placeholder="Type here..."
                    value={postDetails.title}
                    onChange={handleChange}
                />
            </div>

            <div className="option-container">
                <label htmlFor="content-input">
                    <h3>Content</h3>
                </label>
                <textarea
                    className="content-input"
                    id="content-input"
                    name="content"
                    maxLength="600"
                    required
                    value={postDetails.content}
                    placeholder="Type here..."
                    onChange={handleChange}
                />
            </div>

            <input
                className="small-btn"
                type="submit"
                value={submitText}
                onClick={finalPost}
            />
        </form>
    )
}

export default PostInputForm