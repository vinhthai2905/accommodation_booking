import { useLocation } from "react-router"
import { useQuery, keepPreviousData } from "@tanstack/react-query"

import { fetchHotelResult } from "../../../services/search/searchHotelsServices"
import { useSearchHotelsParams } from "./useSearchHotelsParams"

export default function useSearchHotels(isMapOpened, currentPage) {
    const { searchHotelsParams } = useSearchHotelsParams(currentPage)
    const location = useLocation()

    const { 
        isPending: isLoadingHotelsList,
        error: errorLoadingHotelsList,
        data: hotelsData
     } = useQuery({
            queryKey: ["fetchHotelsResultList", searchHotelsParams.toString(), location.key],
            queryFn: (() => fetchHotelResult(searchHotelsParams)),
            enabled: !isMapOpened,
            placeholderData: keepPreviousData
    })

    const paginateHotelsList = hotelsData?.paginate_hotels
    const totalHotels = hotelsData?.total_hotels

    return {
        isLoadingHotelsList,
        errorLoadingHotelsList,
        paginateHotelsList,
        totalHotels
    }

}