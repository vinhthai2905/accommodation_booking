import SearchList from "../../features/search/pages/SearchList"
import SearchMap from "../../features/search/pages/SearchMap"

import LoadingScreen from "../../components/ui/LoadingScreen"

import useSearchHotels from "../../hooks/search/useSearchHotels"
import useOpenMap from "../../hooks/search/useOpenMap"

export default function SearchResults() {
    const { isLoading, error, data } = useSearchHotels()

    const { isMapOpened, openMap, closeMap } = useOpenMap()

    if (isLoading) return <LoadingScreen />
    if (error) return <p>Something went wrong</p>


    return isMapOpened
        ? (
            <SearchMap onClose={closeMap} hotelList={data} />
        )
        : (
            <SearchList onOpenMap={openMap} hotelList={data} />
        )

}