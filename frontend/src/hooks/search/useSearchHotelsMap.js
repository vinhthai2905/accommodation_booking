import { useSearchParams, useLocation } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { fetchHotelResultMap } from "../../services/search/hotelSearchServices"

export default function useSearchHotelsMap(isMapOpened) {
    const [hotelSearchParams] = useSearchParams()

    const location = useLocation()

    const { isLoading, error, data } = useQuery({
        queryKey: ["fetchHotelsResultMap", hotelSearchParams.toString(), location.key],
        queryFn: (() => fetchHotelResultMap(hotelSearchParams)),
        enabled: !!isMapOpened
    })

    return {
        isLoading,
        error,
        data
    }

}