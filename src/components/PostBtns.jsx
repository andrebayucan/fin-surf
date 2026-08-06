import { Link } from 'react-router'
import LikeBtn from './LikeBtn'
import LinkBtn from './LinkBtn'

import './PostBtns.css'

const PostBtns = (props) => {

    return (
        <div className="post-btns small-padding">
            <LinkBtn path={`edit/${props.id}`} image="/padlock.png" alt="A lock icon." text="Edit"/>
            <LinkBtn path={`post/${props.id}`} image="/info.svg" alt="An info icon." text="View"/>
            <LikeBtn id={props.id} initialLikes={props.initialLikes} />
            <LinkBtn path={`post/${props.id}/#comments`} image="/speech-bubble.webp" alt="A green speech bubble icon." text="Comments"/>
        </div>
    )
}

export default PostBtns