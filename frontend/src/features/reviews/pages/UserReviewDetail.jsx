import { useLocation, useNavigate } from "react-router"
import { ArrowLeft, Star } from "lucide-react"
import { motion } from "framer-motion"

export default function UserReviewDetail() {
    const location = useLocation()
    const navigate = useNavigate()
    
    const { hotelName = "Khách sạn", review } = location.state || {}

    if (!review) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Không tìm thấy đánh giá.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mb-6"
                >
                    <ArrowLeft size={16} /> Quay lại
                </button>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                >
                    <div className="px-6 py-5 border-b border-gray-100 bg-blue-50/50">
                        <h1 className="text-xl font-bold text-gray-900">Đánh giá của bạn</h1>
                        <p className="text-sm text-gray-500 mt-1">Tại {hotelName}</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Chất lượng kỳ nghỉ</h3>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={24}
                                        className={star <= Number(review.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Nhận xét của bạn</h3>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {review.content}
                                </p>
                            </div>
                        </div>
                        
                        <div className="text-xs text-gray-400">
                            Đã đánh giá vào: {new Date(review.created_at).toLocaleDateString("vi-VN")}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
