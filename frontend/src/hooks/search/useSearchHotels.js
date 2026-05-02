import { useSearchParams, useLocation } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { fetchHotelResult } from "../../services/hotelServices"

export default function useSearchHotels() {
    const [hotelSearchParams, setHotelSearchParams] = useSearchParams()

    const location = useLocation()

    const { isLoading, error, data } = useQuery({
        queryKey: ["fetchHotelResult", hotelSearchParams.toString(), location.key],
        queryFn: (() => fetchHotelResult(hotelSearchParams))
    })

    return {
        isLoading,
        error,
        data
    }

}