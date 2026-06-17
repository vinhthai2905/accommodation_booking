import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export default function HotelReviewSuccess({ navigate }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center max-w-md text-center"
            >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Gửi đánh giá thành công!</h2>
                <p className="text-gray-500 mb-6">Cảm ơn bạn đã dành thời gian chia sẻ trải nghiệm. Đánh giá của bạn sẽ giúp những du khách khác đưa ra lựa chọn tốt hơn.</p>
                <button
                    onClick={() => navigate("/profile/mytrips.html?tab=past")}
                    className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Quay lại Chuyến đi của tôi
                </button>
            </motion.div>
        </div>
    )
}