import { useSearchParams, useLocation } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { fetchHotelResult } from "../../services/hotelAPI"

export default function useSearchHotels() {
    const [hotelSearchParams, setHotelSearchParams] = useSearchParams()

    // const location = useLocation()

    // console.log(location)

    const { isLoading, error, data } = useQuery({
        queryKey: ["fetchHotelResult", hotelSearchParams.toString()],
        queryFn: (() => fetchHotelResult(hotelSearchParams))
    })

    return {
        isLoading,
        error,
        data
    }

}