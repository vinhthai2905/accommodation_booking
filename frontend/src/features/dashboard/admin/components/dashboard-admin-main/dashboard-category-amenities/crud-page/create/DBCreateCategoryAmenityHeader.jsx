import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"

export default function DBCreateCategoryAmenityHeader() {
    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4"
        >
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mb-2 transition-colors cursor-pointer group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    Quay lại danh sách
                </button>
                <h1 className="mb-1 text-3xl font-bold text-gray-900">Thêm danh mục tiện nghi mới</h1>
                <p className="text-gray-500 text-sm">Điền thông tin bên dưới để tạo danh mục tiện nghi mới cho khách sạn của bạn.</p>
            </div>
        </motion.div>
    )
}
