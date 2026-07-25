import { Link } from 'react-router'
import './TopNav.css'

const TopNav = () => {
    return (
        <div className="nav-bar">
            <Link className="logo-holder" to="/">
                <img src="/site-logo.PNG" alt="A logo containing the words Fin Surf written in stylized text." />
            </Link>
            <div className="nav-links">
                <Link to="/">
                    <h3>Home</h3>
                </Link>
                <Link to="/create">
                    <h3>Create Post</h3>
                </Link>
                <Link to="/about">
                    <h3>About</h3>
                </Link>
            </div>
        </div>
    )
}

export default TopNav