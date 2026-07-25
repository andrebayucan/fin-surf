import { Link } from 'react-router'
import PostBtns from './PostBtns'
import PostContent from './PostContent'
import './Post.css'

const Post = (props) => {
    return (
        <div className="post glass1">
            <PostContent date={props.date} title={props.title} species={props.species} thumbnail={props.thumbnail} content={props.content} />
            <PostBtns id={props.id} comments={props.comments} />
        </div>
    )
}

export default Post