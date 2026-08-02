import LinkBtn from './LinkBtn'
import CreatureContent from './CreatureContent'
import CreatureBtns from './CreatureBtns'
import './CreatureCard.css'

const CreatureCard = (props) => {
    return (
        <div className="creature-card">
            <CreatureContent name={props.name} image={props.image} date={props.date}/>
            <CreatureBtns id={props.id} name={props.name} image={props.image} />
        </div>
    )
}

export default CreatureCard