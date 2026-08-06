import { useState, useEffect } from 'react'

const About = () => {

    useEffect(() => {
        
    }, [])

    return (
        <div className="about-box glass1 large-padding">
            <h1>Thanks for surfin' around <span className="site-name">Fin Surf!</span></h1>
            <h2>Fin Surf is a forum where users can create, edit, delete, read, upvote, and comment on posts about marine life.</h2>
            <h2>Using the public REST API provided by the Ocean Biodiversity Information System (OBIS), this website allows visitors to browse through and sort millions of marine life occurrences.</h2>
            <h2>You can see an organism's scientific name, record date, taxonomic hierarchy, and that creature's number of occurrences in the OBIS database.</h2>
        </div>
    )
}

export default About