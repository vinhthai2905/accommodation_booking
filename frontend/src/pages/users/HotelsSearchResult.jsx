import SearchList from "../../features/search/pages/SearchList"
import SearchMap from "../../features/search/pages/SearchMap"

import LoadingFullScreen from "../../features/book/components/Shared/LoadingFullScreen"

import useSearchHotels from "../../hooks/search/useSearchHotels"
import useOpenMap from "../../hooks/search/useOpenMap"
import useSearchHotelsMap from "../../hooks/search/useSearchHotelsMap"

export default function HotelsSearchResult() {
    const { isMapOpened, openMap, closeMap } = useOpenMap()
    const {
        isLoading: isLoadingHotelsList,
        error: errorLoadingHotelsList,
        data: hotelsList
    } = useSearchHotels(isMapOpened)

    const {
        isLoading: isLoadingHotelsMap,
        error: errorLoadingHotelsMap,
        data: hotelsMap 
    } = useSearchHotelsMap(isMapOpened)

    if (isLoadingHotelsList || isLoadingHotelsMap) return <LoadingFullScreen />

    if (errorLoadingHotelsList || errorLoadingHotelsMap) return <p>Something went wrong</p>

    return isMapOpened
        ? (
            <SearchMap onClose={closeMap} hotelListMap={hotelsMap} />
        )
        : (
            <SearchList onOpenMap={openMap} hotelList={hotelsList} />
        )

}