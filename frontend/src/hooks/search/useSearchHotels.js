import { useSearchParams } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { fetchHotelResult } from "../../services/hotelAPI"

export default function useSearchHotels() {
    const [hotelSearchParams, setHotelSearchParams] = useSearchParams()
    const hotelSearchData = Object.fromEntries(hotelSearchParams.entries())

    const { isLoading, error, data } = useQuery({
        queryKey: ["fetchHotelResult"],
        queryFn: (() => fetchHotelResult(hotelSearchData))
    })



    return {
        isLoading,
        error,
        data
    }

}