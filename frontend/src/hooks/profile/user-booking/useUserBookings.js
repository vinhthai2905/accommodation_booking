import { useQuery } from "@tanstack/react-query"
import { fetchAuthUserBookings } from "../../../services/book/bookingServices"

export default function useUserBookings(activeTab, isAuthenticated) {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["userBookings", activeTab],
        queryFn: () => fetchAuthUserBookings(activeTab),
        enabled: !!isAuthenticated,
        staleTime: Infinity, 
    })

    return { bookings: data ?? [], isPending, isError, error }
}
