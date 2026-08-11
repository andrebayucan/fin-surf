import { Link } from 'react-router'
import PostBtns from './PostBtns'
import PostContent from './PostContent'
import './Post.css'

const Post = (props) => {
    return (
        <div className="post glass">
            <PostContent
                category={props.category}
                date={props.date}
                title={props.title}
                species={props.species}
                thumbnail={props.thumbnail}
                content={props.content}
                password={props.comments}
            />
            <PostBtns
                id={props.id}
                initialLikes={props.initialLikes}
                comments={props.comments}
            />
        </div>
    )
}

export default Post