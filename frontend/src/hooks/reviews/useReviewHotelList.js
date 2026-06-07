import { useQuery } from "@tanstack/react-query";
import { fetchHotelReviews } from "../../services/reviews/hotelReviewServices";

export function useReviewHotelList(id_hotel, isReviewDrawerOpen) {
    const isHotelReviewOpened = id_hotel && isReviewDrawerOpen

    return useQuery({
        queryKey: ["hotelReviews", id_hotel],
        queryFn: () => fetchHotelReviews(id_hotel),
        enabled: !!isHotelReviewOpened,
    });
};
