import { useLocation } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { fetchHotelResult } from "../../../services/search/hotelSearchServices"
import { useSearchHotelsParams } from "./useSearchHotelsParams"

export default function useSearchHotels(isMapOpened) {
    const { searchHotelsParams } = useSearchHotelsParams()
    const location = useLocation()

    const { isPending, error, data } = useQuery({
        queryKey: ["fetchHotelsResultList", searchHotelsParams.toString(), location.key],
        queryFn: (() => fetchHotelResult(searchHotelsParams)),
        enabled: !isMapOpened
    })

    return {
        isPending,
        error,
        data
    }

}