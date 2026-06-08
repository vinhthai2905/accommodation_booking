import HotelReviewListItem from "./HotelReviewListItem"

export default function HotelReviewList({ isFetchingReviewList, isErrorFetchingReviewList, reviews }) {
    const hasAnyReviews = reviews && reviews.length > 0

    return (
        <div className="flex flex-col border-t border-gray-200">
            {isFetchingReviewList
                ? (
                    <div className="p-6 text-center text-gray-500">Đang tải đánh giá...</div>
                )
                : isErrorFetchingReviewList
                    ? (
                        <div className="p-6 text-center text-red-500">Đã xảy ra lỗi khi tải đánh giá.</div>
                    )
                    : hasAnyReviews
                        ? (
                            reviews.map((review, index) => (
                                <HotelReviewListItem key={review.id || index} review={review} />
                            ))
                        )
                        : (
                            <div className="p-6 text-center text-gray-500">Chưa có đánh giá nào cho khách sạn này.</div>
                        )}
        </div>
    )
}