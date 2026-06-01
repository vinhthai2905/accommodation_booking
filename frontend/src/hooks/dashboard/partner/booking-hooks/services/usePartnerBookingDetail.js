import { useQuery } from "@tanstack/react-query"
import { fetchPartnerBookingDetail } from "../../../../../services/dashboard/partner/get-methods/partnerBookingGetServices"

export function usePartnerBookingDetail(bookingId) {
    const { data: booking, isPending: isLoading, isError, error } = useQuery({
        queryKey: ["partnerBookingDetail", bookingId],
        queryFn: () => fetchPartnerBookingDetail(bookingId),
        enabled: !!bookingId,
    })

    return { booking, isLoading, isError, error }
}
