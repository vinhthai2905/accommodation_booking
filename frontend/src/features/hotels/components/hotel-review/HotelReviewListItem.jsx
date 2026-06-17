import { Bed, Calendar, Users, Frown, Smile, ThumbsUp, ThumbsDown, Star } from "lucide-react"
import { clsx } from "clsx"

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `Đã đánh giá: ${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
};

const getTitleFromScore = (scoreStr) => {
  const score = parseFloat(scoreStr);
  if (isNaN(score)) return "Đánh giá";
  if (score >= 5) return "Tuyệt vời";
  if (score >= 4) return "Rất tốt";
  if (score >= 3) return "Tốt";
  if (score >= 2) return "Bình thường";
  return "Kém";
};

export default function HotelReviewListItem({ review }) {
  const data = review || {};

  const authorName = data.reviewer_name || "Khách ẩn danh";
  const authorInitial = authorName.charAt(0).toUpperCase();
  const authorCountry = data.reviewer_country || "Việt Nam";
  const authorCountryFlag = "🇻🇳"; 
  
  const roomType = data.room_type || "Phòng tiêu chuẩn";
  const stayDuration = data.stay_duration || "";
  const groupType = data.group_type || "Khách lẻ";
  
  const reviewedDate = formatDate(data.created_at);
  const score = data.rating ? parseFloat(data.rating).toFixed(1).replace(".", ",") : "0,0";
  const title = getTitleFromScore(data.rating);
  
  const positiveText = data.content || "";
  const negativeText = "";
  
  const colors = ["bg-cyan-500", "bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-pink-500", "bg-rose-500", "bg-orange-500", "bg-green-500"];
  const colorIndex = authorName.charCodeAt(0) % colors.length;
  const avatarColor = colors[colorIndex] || "bg-cyan-500";

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
          {stayDuration && (
            <div className="flex items-center gap-3">
              <Calendar className="w-4.5 h-4.5 text-gray-400" />
              <span>{stayDuration}</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Users className="w-4.5 h-4.5 text-gray-400" />
            <span>{groupType}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full md:w-2/3 lg:w-[70%]">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 mb-1">{reviewedDate}</span>
            <span className="text-xl font-bold text-gray-900">{title}</span>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={clsx(
                  "w-5 h-5",
                  star <= parseInt(data.rating || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                )}
              />
            ))}
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
