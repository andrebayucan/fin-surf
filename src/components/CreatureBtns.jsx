import LinkBtn from './LinkBtn'
import './CreatureBtns.css'

const CreatureBtns = (props) => {
    return (
        <div className="creature-btns">
            <LinkBtn path={`/creatures/page/${props.id}`} text="Details" />
            <LinkBtn path={`/create/${props.id}`} text="Create Post" />
        </div>
    )
}

export default CreatureBtns