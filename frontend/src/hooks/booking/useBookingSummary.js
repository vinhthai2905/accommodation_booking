import { useQuery } from "@tanstack/react-query"
import { fetchBookingSummary } from "../../services/bookingServices"
import { useSearchParams } from "react-router"

export default function useBookingSummary(hasAllBookingParams) {
    const [searchParams] = useSearchParams()

    const { isLoading, data, error } = useQuery({
        queryKey: ["fetchBookingSummary"],
        queryFn: () => {
            return fetchBookingSummary(searchParams.get("hotel_id"))
        },
        enabled: hasAllBookingParams,
        staleTime: 1000 * 60 * 10,
    })

    return {
        isLoading,
        data,
        error
    }
}