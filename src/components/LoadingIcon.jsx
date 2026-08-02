import Image from './Image'
import './LoadingIcon.css'

const LoadingIcon = () => {
    return (
        <Image src="/circular-arrows.svg" alt="White arrows traveling in a circle." className="spin square" />
    )
}

export default LoadingIcon