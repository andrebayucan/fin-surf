import { Link } from 'react-router'
import LinkBtn from './LinkBtn'
import './IntroBox.css'

const IntroBox = ({hideFunction}) => {

    return (
        <div className="intro-box glass medium-padding">
            <div className="exit-container">
                <button className="exit-btn" onClick={hideFunction}>
                    <img src="/exit-button.jpg"/>
                </button>
            </div>
            <div className="intro-text">
                <h1>Welcome to <span className="site-name">Fin Surf</span>!</h1>
                <h3>Ready to learn about the deep?</h3>
                <p>Try creating a post, or read more about this site!</p>
            </div>
            <div className="intro-btns">
                <LinkBtn path={`creatures`} image="/green-pencil.svg" alt="A lock icon." text="Create Post"/>
                <LinkBtn path={`about`} image="/info.svg" alt="An info icon." text="About Section"/>
            </div>
        </div>
    )
}

export default IntroBox