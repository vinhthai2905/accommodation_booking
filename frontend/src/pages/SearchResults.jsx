import SearchList from "../features/search/pages/SearchList"
import SearchMap from "../features/search/pages/SearchMap"

import { useLocation, useNavigate } from "react-router"

export default function SearchResults() {
    const location = useLocation()
    const navigate = useNavigate()

    const isMapOpened = location.hash === "#map_opened"

    const openMap = () => {
        navigate({
            pathname: location.pathname,
            search: location.search,
            hash: "map_opened",
        })
    }

    const closeMap = () => {
        navigate({
            pathname: location.pathname,
            search: location.search,
            hash: "",
        })
    }

    return isMapOpened 
        ? (
        <SearchMap onClose={closeMap} />
    )    
        : (
        <SearchList onOpenMap={openMap} />
    )
}