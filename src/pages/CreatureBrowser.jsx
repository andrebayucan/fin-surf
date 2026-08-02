import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import LoadingIcon from '../components/LoadingIcon'
import FilterBar from '../components/FilterBar'
import CreatureCard from '../components/CreatureCard'
import './CreatureBrowser.css'

const CreatureBrowser = () => {

    const [loaded, setLoaded] = useState(false)

    const [params] = useSearchParams()
    const page = params.get("page")
    const size = params.get("size")
    const contains = params.get("contains")
    const sortType = params.get("sort_type")
    const orderBy = params.get("order_by")

    const [creatures, setCreatures] = useState(null)
    const [filteredCreatures, setFilteredCreatures] = useState(null)
    const [searchType, setSearchType] = useState("Species")
    const [filters, setFilters] = useState({
        results: Number(size) || 10,
        page: Number(page) || 1,
        text: contains || "",
        orderBy: orderBy || "descending",
        sortType: sortType || "date"
    })

    const sortCreatures = (list) => {
        if (!list)
            return

        if (filters.sortType== "date")
            orderBy == "ascending" ? list.sort((a, b) => a.date.localeCompare(b.date)) : list.sort((a, b) => b.date.localeCompare(a.date))
        
        setFilteredCreatures(list)
    }

    useEffect(() => {
        const fetchOrganisms = async () => {
            const totalResults = filters.results * filters.page
            let query = `https://api.obis.org/v3/occurrence?startdate=1500-01-01&size=${totalResults}`
            const allCreatures = await fetch(query)
            const allCreaturesJson = await allCreatures.json()

            const startIndex = filters.results * (filters.page - 1)
            const rawCreatures = allCreaturesJson.results.splice(startIndex, totalResults)

            let creatureList = []

            for (const creature of rawCreatures) {
                if (!creature.scientificName?.toLowerCase().includes(filters.text?.toLowerCase()))
                        continue

                const additionalInfo = await fetch(`https://api.inaturalist.org/v1/taxa?per_page=1&q=${creature.scientificName}`)
                const infoJson = await additionalInfo.json()
                const creaturePhoto = (infoJson?.results[0]?.default_photo?.medium_url ?? infoJson?.results[0]?.default_photo?.square_url) ?? null
                
                creatureList.push({
                    id: creature.id,
                    name: creature.scientificName,
                    image: creaturePhoto,
                    date: creature.eventDate
                })
            }

            sortCreatures(creatureList)
            setCreatures(creatureList)
            setFilteredCreatures(creatureList)
            setLoaded(true)
        }
        
        fetchOrganisms().catch(console.error)
    }, [filters])

    if (loaded)
        return (
            <>
                <FilterBar initialFilters={filters} creatureBrowser={true} />
                <div className="creature-browser">
                    {filteredCreatures && filteredCreatures.length > 0 ? 
                    filteredCreatures.map((creature, index) => {
                        return (
                            <CreatureCard
                            key={creature.id}
                            id={creature.id}
                            name={creature.name}
                            image={creature.image}
                            date={creature.date}
                            />
                        )
                    })
                    : ""}
                </div>
            </>
        )
    else {
        return (
             <LoadingIcon src="/loading-arrows.svg" alt="White arrows traveling in a circle." type="square" />
        )
    }
}

export default CreatureBrowser