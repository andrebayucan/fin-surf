import { Link } from 'react-router'

import './PostBtns.css'

const PostBtns = ({id, comments}) => {
    return (
        <div className="post-btns">
            <Link className="small-btn" to={`edit/${id}`}>
                <img src="./padlock.png" alt="A lock icon." />
                Edit
            </Link>

            <Link className="small-btn" to={`edit/${id}`}>
                <img src="./speech-bubble.webp" alt="A green speech bubble icon." />
                Comments
            </Link>
        </div>
    )
}

export default PostBtns