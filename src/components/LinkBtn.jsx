import { Link } from 'react-router'

const LinkBtn = ({path, image, alt, text}) => {
    return (
        <Link className="small-btn" to={path} reloadDocument>
            {image ? <img src={image} alt={alt} /> : ""}
            {text}
        </Link>
    )
}

export default LinkBtn