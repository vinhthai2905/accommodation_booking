import { Bed, Calendar, Users, Frown, Smile, ThumbsUp, ThumbsDown } from "lucide-react"
import { clsx } from "clsx"

export default function HotelReviewListItem({ review }) {
  const {
    authorInitial = "S",
    authorName = "Stephanie",
    authorCountryFlag = "🇭🇰",
    authorCountry = "Hồng Kông",
    roomType = "Phòng Đôi Deluxe",
    stayDuration = "6 đêm · Tháng 6 2026",
    groupType = "Cặp đôi",
    reviewedDate = "Đã đánh giá: 5 tháng 6, 2026",
    title = "Rất tốt",
    score = "8,0",
    negativeText = "Thoát nước phòng tắm hơi chậm",
    positiveText = "Kỳ nghỉ tuyệt vời chắc chắn sẽ quay lại. Phòng rất sạch sẽ và thực sự đẹp. Nhân viên cực kỳ thân thiện.",
    avatarColor = "bg-cyan-500"
  } = review || {}

  return (
    <div className="flex flex-col md:flex-row gap-6 py-6 border-b border-gray-200 bg-white text-gray-900 px-4">
      <div className="flex flex-col gap-6 w-full md:w-1/3 lg:w-[30%]">
        <div className="flex items-center gap-3">
          <div className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg",
            avatarColor
          )}>
            {authorInitial}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-gray-900">{authorName}</span>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="text-sm">{authorCountryFlag}</span>
              <span>{authorCountry}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <Bed className="w-4.5 h-4.5 text-gray-400" />
            <span>{roomType}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4.5 h-4.5 text-gray-400" />
            <span>{stayDuration}</span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-4.5 h-4.5 text-gray-400" />
            <span>{groupType}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full md:w-2/3 lg:w-[70%]">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">{reviewedDate}</span>
            <span className="text-xl font-bold text-gray-900">{title}</span>
          </div>
          <div
            className={clsx(
              "flex h-8 w-8 items-center justify-center",
              "bg-blue-600 text-sm font-bold text-white",
              "rounded-t-md rounded-br-md rounded-bl-none"
            )}
          >
            {score}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-1">
          {negativeText && (
            <div className="flex items-start gap-3 text-gray-700 text-sm">
              <Frown className="w-4.5 h-4.5 text-gray-400 mt-0.5 shrink-0" />
              <span className="leading-relaxed">{negativeText}</span>
            </div>
          )}
          {positiveText && (
            <div className="flex items-start gap-3 text-gray-700 text-sm">
              <Smile className="w-4.5 h-4.5 text-green-500 mt-0.5 shrink-0" />
              <span className="leading-relaxed">{positiveText}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-5 mt-6 text-blue-600 text-sm font-medium">
          <button className="flex items-center gap-1.5 hover:text-blue-800 transition-colors">
            <ThumbsUp className="w-4.5 h-4.5" /> Hữu ích
          </button>
          <button className="flex items-center gap-1.5 hover:text-blue-800 transition-colors">
            <ThumbsDown className="w-4.5 h-4.5" /> Không hữu ích
          </button>
        </div>
      </div>
    </div>
  )
}
