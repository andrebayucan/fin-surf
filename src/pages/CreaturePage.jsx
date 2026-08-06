import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { formatNumber, capitalizeFirst } from '../Helpers'
import FilterBar from '../components/FilterBar'
import Image from "../components/Image"
import LinkBtn from '../components/LinkBtn'
import './CreaturePage.css'

const CreaturePage = () => {

    const {id} = useParams()
    const [fullDetails, setFullDetails] = useState({
        name: null,
        image: null,
        date: null,
        records: null,
        kingdom: null,
        phylum: null,
        class: null,
        order: null,
        family: null,
        genus: null,
        species: null
    })

    const fetchRecordsCount = async (scientificName) => {
        const taxonResponse = await fetch(`https://api.obis.org/v3/taxon/${scientificName}`)
        const taxonJson = await taxonResponse.json()
        const taxonId = taxonJson?.results[0]?.taxonID

        const recordsResponse = await fetch(`https://api.obis.org/v3/occurrence?size=0&taxonid=${taxonId}`)
        const recordsResponseJson = await recordsResponse.json()
        return recordsResponseJson.total
    }

    useEffect(() => {
        const fetchFullDetails = async () => {
            const response = await fetch(`https://api.obis.org/v3/occurrence?startdate=1500-01-01&id=${id}`)
            const json = await response.json()

            const creature = json?.results[0]
            const additionalInfo = await fetch(`https://api.inaturalist.org/v1/taxa?per_page=1&q=${creature.scientificName}`)
            const infoJson = await additionalInfo.json()
            const creaturePhoto = (infoJson?.results[0]?.default_photo?.medium_url ?? infoJson?.results[0]?.default_photo?.square_url) ?? null

            const creatureRecords = formatNumber(await fetchRecordsCount(creature.scientificName))

            setFullDetails({
                name: creature.scientificName,
                image: creaturePhoto,
                date: creature.date,
                records: creatureRecords,
                taxon: {
                    kingdom: creature.kingdom,
                    phylum: creature.phylum,
                    class: creature.class,
                    order: creature.order,
                    family: creature.family,
                    genus: creature.genus,
                    species: creature.species
                }
            })
        }

        fetchFullDetails().catch(console.error)
    }, [])

    return (
        <div className="creature-page glass1 large-padding">
            <LinkBtn path={`/create/${id}`} text="Create Post" />
            <h3>{fullDetails.name}</h3>
            <h2>{fullDetails.records ? `Records: ${fullDetails.records}` : ""}</h2>
            <br />
            {fullDetails.taxon ?
                Object.entries(fullDetails.taxon).map(([rank, value]) => {
                    if (value)
                        return (
                            <p key={rank}>{capitalizeFirst(rank)}: {value}</p>
                        )
                })
                :
                ""
            }
            
            <br />
            
            {fullDetails.image ?
            <Image src={fullDetails.image} alt={fullDetails.name} />
            :
            ""}
            
            
        </div>
    )
}

export default CreaturePage