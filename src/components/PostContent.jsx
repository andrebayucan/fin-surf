import { translateDate } from '../Helpers'
import Image from './Image'
import './PostContent.css'

const PostContent = (props) => {
    return (
        <div className="post-content large-padding">
            <Image src={props.thumbnail.image} alt={props.thumbnail.name} className="square" />
            <div className="post-details">
                <div className="basic-details">
                    <h3>{props.title}</h3>
                    <h2>{translateDate(props.date)}</h2>
                    <h2 className={props.category == "Creature" ? "creature-category" : "sighting-category"}>{props.category}</h2>
                </div>
                <div className="description-container">
                    <p>{props.content}</p>
                </div>
            </div>
        </div>
    )
}

export default PostContent