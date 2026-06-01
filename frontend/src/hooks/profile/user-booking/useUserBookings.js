import { useQuery } from "@tanstack/react-query"
import { fetchAuthUserBookings } from "../../../services/book/bookingServices"

export default function useUserBookings(activeTab) {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["userBookings", activeTab],
        queryFn: () => fetchAuthUserBookings(activeTab),
        staleTime: Infinity, // 2 min
    })

    return { bookings: data ?? [], isLoading, isError, error }
}
