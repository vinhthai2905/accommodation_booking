import { useQuery } from "@tanstack/react-query"
import { fetchHotelRefundPolicy } from "../../../services/hotel/hotelServices"

export default function useBookingRefundPolicy(activeTab, hotelId) {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["hotelRefundPolicy", hotelId],
        queryFn: () => fetchHotelRefundPolicy(hotelId),
        enabled: !!hotelId && activeTab === "upcoming",
        staleTime: Infinity,
    })

    return { refundPolicy: data, isFetchingRefundPolicy: isPending, isErrorFetchingHotelPolicy: isError, error }
}
