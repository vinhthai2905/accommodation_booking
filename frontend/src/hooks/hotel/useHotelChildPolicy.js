import { useQuery } from "@tanstack/react-query"

import { fetchHotelChildPolicy } from "../../services/hotelServices"
import { useSearchParams } from "react-router"

export default function useHotelChildPolicy() {
    const [searchParams] = useSearchParams()

    const { isLoading, data, error } = useQuery({
        queryKey: ["fetchHotelChildPolicy"],
        queryFn: () => {
            return fetchHotelChildPolicy(searchParams.get("hotel_id"))
        }
    })

    return {
        isLoading,
        data,
        error
    }
}