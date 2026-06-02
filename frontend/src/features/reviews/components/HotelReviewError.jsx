import { ArrowLeft, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router"

export default function HotelReviewError({ error, onRetry }) {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center max-w-md text-center"
            >
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle size={32} />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Đã xảy ra lỗi!</h2>
                
                <p className="text-gray-500 mb-6">
                    {error?.message || "Không thể tải thông tin đặt phòng. Vui lòng thử lại sau."}
                </p>

                <div className="flex gap-3 w-full justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft size={16} /> Quay lại
                    </button>
                    
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Thử lại
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
