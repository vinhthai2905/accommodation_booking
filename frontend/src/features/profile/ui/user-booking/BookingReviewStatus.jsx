import { Link } from "react-router"

export default function BookingReviewStatus({ booking, hotel, reviews, isFetchingReviews }) {
    const isReviewed = booking?.review?.content

    return (
        <div className="flex items-center gap-2">
            {isReviewed ? (
                <button
                    type="button"
                    className="flex items-center gap-1.5 px-4 py-1.5 text-gray-700 font-medium text-xs rounded-lg border border-gray-200 transition-colors shadow-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                >
                    Xem đánh giá
                </button>
            ) : (
                <Link
                    to={`/profile/booking/review/${booking.hotel.slug}/${booking.id_booking}`}
                    state={{ hotelName: hotel?.name }}
                    className="flex items-center gap-1.5 px-4 py-1.5 text-blue-700 font-medium text-xs rounded-lg border border-blue-200 transition-colors shadow-sm bg-blue-50 hover:bg-blue-100 cursor-pointer"
                >
                    Đánh giá
                </Link>
            )}

            {isFetchingReviews ? (
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            ) : reviews?.length > 0 ? (
                <span className="text-[11px] text-gray-500 font-medium">
                    {reviews.length} đánh giá
                </span>
            ) : null}
        </div>
    )
}