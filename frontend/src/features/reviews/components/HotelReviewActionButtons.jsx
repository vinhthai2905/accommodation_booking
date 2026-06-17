import { clsx } from "clsx"

export default function HotelReviewActionButtons({ navigate, isSubmitting }) {
    return (
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className={clsx(
                    "px-5 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors",
                    "text-sm font-medium text-gray-700"
                )}
            >
                Hủy
            </button>
            <button
                type="submit"
                disabled={isSubmitting}
                className={clsx(
                    "flex items-center justify-center min-w-30 px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-colors",
                    "cursor-pointer",
                    isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-sm",
                )}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Đang gửi...
                    </>
                ) : (
                    "Gửi đánh giá"
                )}
            </button>
        </div>
    )
}