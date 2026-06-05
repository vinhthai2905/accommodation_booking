import clsx from "clsx"
import HotelReviewGuestHighlight from "./HotelReviewGuestHighlight"

export default function HotelReview({ onRatingClick }) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-3 relative grow",
        "w-full border rounded-lg border-gray-200 bg-white",
        "p-4"
      )}
    >
      <div
        className="flex items-start justify-end gap-3 cursor-pointer hover:opacity-80 transition-opacity select-none"
        onClick={onRatingClick}
        role="button"
        tabIndex={0}
      >
        <div className="text-right mt-0.5">
          <p className="text-base font-medium text-gray-900 leading-none">Xuất sắc</p>
          <p className="mt-1 text-sm text-gray-500">330 đánh giá</p>
        </div>

        <div
          className={clsx(
            "flex h-10 w-10 items-center justify-center",
            "bg-blue-700 text-base font-bold text-white",
            "rounded-t-lg rounded-br-lg rounded-bl-none"
          )}
        >
          9,7
        </div>
      </div>

      <HotelReviewGuestHighlight />
    
    </div>
  )
}