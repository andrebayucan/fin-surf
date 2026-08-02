import { translateDate } from '../Helpers'
import Image from './Image'
import './CreatureContent.css'

const CreatureContent = (props) => {
    return (
        <div className="creature-content">
            <Image src={props.image} alt={props.name} className="square" />
            <div className="card-details">
                <h3>{props.name}</h3>
                <h2>Record date: {translateDate(props.date)}</h2>
            </div>
        </div>
    )
}

export default CreatureContent