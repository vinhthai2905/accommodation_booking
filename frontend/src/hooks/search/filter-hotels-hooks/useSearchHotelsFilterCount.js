import { useLocation } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { fetchHotelAmenitiesCount } from "../../../services/search/searchHotelsFilterCountServices"
import { useSearchHotelsParams } from "../hotel-search-hooks/useSearchHotelsParams"

export function useSearchHotelAmenitiesCount() {
    const { searchHotelsParams } = useSearchHotelsParams()
    const location = useLocation()

    const { isPending, error, data } = useQuery({
        queryKey: ["fetchHotelAmenitiesCount", searchHotelsParams.toString(), location.key],
        queryFn: (() => fetchHotelAmenitiesCount(searchHotelsParams))
    })

    return {
        isPending,
        error,
        data
    }
}