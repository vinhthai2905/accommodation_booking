import { useQuery } from "@tanstack/react-query"

import { fetchHotelPolicy } from "../../services/hotelServices"
import { useSearchParams } from "react-router"

export default function useHotelChildPolicy() {
    const [searchParams, setSearchParams] = useSearchParams()

    const { isLoading, data, error } = useQuery({
        queryKey: ["fetchHotelPolicy"],
        queryFn: () => {
            return fetchHotelPolicy(searchParams.get("hotel_id"))
        }
    })

    return {
        isLoading,
        data,
        error
    }
}