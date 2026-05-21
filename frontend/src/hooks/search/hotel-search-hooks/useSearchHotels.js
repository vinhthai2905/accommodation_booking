import { useSearchParams, useLocation } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { fetchHotelResult } from "../../../services/search/hotelSearchServices"

export default function useSearchHotels(isMapOpened) {
    const [hotelSearchParams] = useSearchParams()
    
    const location = useLocation()

    const { isPending, error, data } = useQuery({
        queryKey: ["fetchHotelsResultList", hotelSearchParams.toString(), location.key],
        queryFn: (() => fetchHotelResult(hotelSearchParams)),
        enabled: !isMapOpened
    })

    return {
        isPending,
        error,
        data
    }

}