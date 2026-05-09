import { useQuery } from "@tanstack/react-query"
import { fetchBookingSummary } from "../../services/book/bookingServices"
import { useSearchParams } from "react-router"

export default function useBookingSummary(hasAllBookingParams) {
    const [searchParams] = useSearchParams()

    const { isPending, data, error } = useQuery({
        queryKey: ["fetchBookingSummary"],
        queryFn: () => {
            return fetchBookingSummary(searchParams.get("hotel_id"))
        },
        enabled: hasAllBookingParams,
        staleTime: 1000 * 60 * 10,
    })

    return {
        isPending,
        data,
        error
    }
}