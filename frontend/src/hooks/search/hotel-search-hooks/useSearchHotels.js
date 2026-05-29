import { useLocation } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { fetchHotelResult } from "../../../services/search/searchHotelsServices"
import { useSearchHotelsParams } from "./useSearchHotelsParams"

export default function useSearchHotels(isMapOpened) {
    const { searchHotelsParams } = useSearchHotelsParams()
    const location = useLocation()

    const { 
        isPending: isLoadingHotelsList,
        error: errorLoadingHotelsList,
        data: hotelsList
     } = useQuery({
            queryKey: ["fetchHotelsResultList", searchHotelsParams.toString(), location.key],
            queryFn: (() => fetchHotelResult(searchHotelsParams)),
            enabled: !isMapOpened
    })

    return {
        isLoadingHotelsList,
        errorLoadingHotelsList,
        hotelsList
    }

}