import './IntroBox.css'

const IntroBox = ({hideFunction}) => {

    return (
        <div className="intro-box glass1">
            <div className="exit-container">
                <button className="exit-btn" onClick={hideFunction}/>
            </div>
            <div className="intro-text">
                <h1>Welcome to <span className="site-name">Fin Surf</span>!</h1>
                <h3>Ready to learn about the deep?</h3>
                <p>Try creating a post, or read more about this site!</p>
            </div>
        </div>
    )
}

export default IntroBox