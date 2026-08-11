import { useState, useEffect } from 'react'
import './FilterBar.css'

const FilterBar = ({initialFilters, baseURL, creatureBrowser=false}) => {

    const [pageNum, setPageNum] = useState(1)
    const [numResults, setNumResults] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [sortType, setSortType] = useState("date")
    const [orderBy, setOrderBy] = useState("descending")
    const [filters, setFilters] = useState({
        results: 10,
        page: 1,
        text: "",
        category: "Sighting",
        orderBy: "descending",
        sortType: "date"
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setFilters((prevState) => {
            return {
                ...prevState,
                [name]:value
            }
        })
    }

    const handlePageNumChange = event => {
        setPageNum(event.target.value)
        handleChange(event)
    }

    const searchItemsRange = event => {
        setNumResults(event.target.value)
        handleChange(event)
    }

    const handleTextChange = event => {
        setSearchText(event.target.value)
        handleChange(event)
    }

    const handleDropdownChange = event => {
        setSortType(event.target.value)
    }

    const handleOrderByChange = event => {
        setOrderBy(event.target.value)
        handleChange(event)
    }

    const queryPage = () => {
        if (creatureBrowser)
            window.location = `/creatures/?size=${filters.results}&page=${filters.page}&contains=${filters.text}&sort_type=${sortType}&order_by=${orderBy}`
        else
            window.location = `/?size=${filters.results}&page=${filters.page}&contains=${filters.text}&sort_type=${sortType}&order_by=${orderBy}`
    }

    useEffect(() => {
        setPageNum(initialFilters.page)
        setNumResults(initialFilters.results)
        setSearchText(initialFilters.text)
        setSortType(initialFilters.sortType)
        setOrderBy(initialFilters.orderBy)
        setFilters(initialFilters)
    }, [])

    return (
        <div className="filters glass large-padding">
                
            <div className="sort-container">
                <label htmlFor="page-input">
                    <p>{creatureBrowser ? "Offset" : "Page"} Number</p>
                </label>
                <input
                    className="input-box page-input"
                    type="text"
                    id="page-input"
                    name="page"
                    placeholder="Number..."
                    value={pageNum}
                    onChange={handlePageNumChange}
                />
            </div>

            <div className="range-bar-container small-padding">
                <label htmlFor="results-input">
                    <p>{creatureBrowser ? "Query Size:"  : "Results per Page:" } {numResults}</p>
                </label>
                <input
                    className="range-bar"
                    type="range"
                    id="results-input"
                    name="results"
                    min="1"
                    max={creatureBrowser ? 100 : 50}
                    value={numResults}
                    step="1"
                    onChange={searchItemsRange}
                />
            </div>

            <input
                className="input-box"
                type="text"
                id="text-input"
                name="text"
                value={searchText}
                placeholder="Search..."
                onChange={handleTextChange}
            />

            <div className="sort-container">
                <label htmlFor="sort-input">
                    <p>Sorting</p>
                </label>
                <select className="small-padding" name="sort" id="sort-input" value={sortType} onChange={handleDropdownChange}>
                    <option value="date">Date</option>
                    {creatureBrowser ? "" : <option value="likes">Likes</option>}
                </select>
            </div>
            
            <div className="sort-type-list" key="sort-types">
                <div className="sort-option">
                    <input
                    id="descending-option"
                    name="orderBy"
                    type="radio"
                    value="descending"
                    onChange={handleOrderByChange}
                    checked={orderBy == "descending"}
                    />
                    <label htmlFor="descending-option">
                        <p>{sortType == "date" ? "Newest" : "Descending"}</p>
                    </label>
                </div>
                <div className="sort-option">
                    <input
                    id="ascending-option"
                    name="orderBy"
                    type="radio"
                    value="ascending"
                    onChange={handleOrderByChange}
                    checked={orderBy == "ascending"}
                    />
                    <label htmlFor="ascending-option">
                        <p>{sortType == "date" ? "Oldest" : "Ascending"}</p>
                    </label>
                </div>
            </div>

            <input className="small-btn" type="submit" value="Search" onClick={queryPage}/>
        </div>
    )
}

export default FilterBar