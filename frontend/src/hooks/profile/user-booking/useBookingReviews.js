import { useQuery } from "@tanstack/react-query"
import { fetchHotelReviews } from "../../../services/reviews/reviewServices"

export default function useBookingReviews(activeTab, hotelId) {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["hotelReviews", hotelId],
        queryFn: () => fetchHotelReviews(hotelId),
        enabled: !!hotelId && activeTab === "past",
        staleTime: Infinity,
    })

    return { reviews: data, isFetchingReviews: isPending, isErrorFetchingReview: isError, error }
}
