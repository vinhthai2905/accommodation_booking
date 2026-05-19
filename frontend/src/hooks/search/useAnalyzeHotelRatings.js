export default function useAnalyzeHotelRatings(hotel) {
    const ratingScore = hotel.rating || 9.3
    const ratingLabel = ratingScore >= 9 ? "Tuyệt vời" : ratingScore >= 8 ? "Rất tốt" : "Tốt"
    const reviewsCount = hotel.reviews_count || 34

    return {
        ratingScore,
        ratingLabel,
        reviewsCount
    }
}