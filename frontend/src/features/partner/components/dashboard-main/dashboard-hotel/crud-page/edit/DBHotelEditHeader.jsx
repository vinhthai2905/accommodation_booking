import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"

export default function DBHotelEditHeader({ motion, hotelName, isEditing }) {
    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4"
        >
            <div>
                {isEditing && (
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mb-2 transition-colors cursor-pointer group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                        Quay lại
                    </button>
                )}
                <h1 className="mb-1 text-3xl font-bold text-gray-900 flex items-center gap-3 flex-wrap">
                    {isEditing ? "Chỉnh sửa:" : "Thông tin khách sạn:"}{" "}
                    <span className="text-blue-600">{hotelName || "Đang tải..."}</span>
                </h1>
                <p className="text-gray-500 text-sm">
                    {isEditing 
                        ? "Cập nhật các thông tin cơ bản cho khách sạn." 
                        : "Xem và quản lý các thông tin tổng quan của khách sạn."}
                </p>
            </div>
        </motion.div>
    )
}
