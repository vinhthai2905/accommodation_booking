import SearchList from "../../features/search/pages/SearchList"
import SearchMap from "../../features/search/pages/SearchMap"

import LoadingFullScreen from "../../features/book/components/Shared/LoadingFullScreen"

import { useEffect } from "react"

import useSearchHotels from "../../hooks/search/hotel-search-hooks/useSearchHotels"
import useSearchHotelsMap from "../../hooks/search/hotel-search-hooks/useSearchHotelsMap"
import useOpenMap from "../../hooks/search/map-search-hooks/useOpenMap"

import { useMapBounds } from "../../hooks/map/useMapBounds"
import { useHotelsMapCacheRef } from "../../hooks/search/map-search-hooks/useHotelsMapCacheRef"
import { useTabTitle } from "../../hooks/common/useTabTitle"

export default function HotelsSearchResult() {
    useTabTitle("Booking.com: Kết quả tìm kiếm")
    const { isMapOpened, openMap, closeMap } = useOpenMap()
    const { mapBounds, setMapBounds, handleMapViewPortChange } = useMapBounds()
    const {
        isLoadingHotelsList,
        errorLoadingHotelsList,
        hotelsList
    } = useSearchHotels(isMapOpened)

    const {
        isPending: isLoadingHotelsMap,
        error: errorLoadingHotelsMap,
        data: hotelsMap
    } = useSearchHotelsMap(isMapOpened, mapBounds)

    const { hotelsMapCacheRef } = useHotelsMapCacheRef(hotelsMap)

    if (!isMapOpened && isLoadingHotelsList) return <LoadingFullScreen />

    if (!isMapOpened && errorLoadingHotelsList) return <p>Something went wrong.</p>

    return isMapOpened
        ? (
            <SearchMap
                onClose={closeMap}
                hotelListMap={hotelsMap}
                hotelsMapCacheRef={hotelsMapCacheRef}
                handleMapViewPortChange={handleMapViewPortChange}
                isLoadingHotelsMap={isLoadingHotelsMap}
                errorLoadingHotelsMap={errorLoadingHotelsMap}
            />
        )
        : (
            <SearchList onOpenMap={openMap} hotelList={hotelsList} />
        )

}