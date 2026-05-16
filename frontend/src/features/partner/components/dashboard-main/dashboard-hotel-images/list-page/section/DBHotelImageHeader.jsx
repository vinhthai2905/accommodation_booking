import { Plus, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router"

export default function DBHotelImageHeader() {
    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4"
        >
            <div>
                <button
                    onClick={() => navigate("/partner/dashboard/hotel/info")}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mb-2 transition-colors cursor-pointer group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    Quay lại
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Hình ảnh khách sạn</h1>
                <p className="text-gray-500 mt-1">Quản lý và hiển thị danh sách các hình ảnh của khách sạn.</p>
            </div>
            
            <button
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 font-medium text-white bg-[#003b95] rounded-xl overflow-hidden transition-all hover:bg-[#002b70] hover:shadow-lg hover:shadow-blue-900/20 active:scale-95 sm:w-auto w-full cursor-pointer"
            >
                <Plus size={20} className="transition-transform group-hover:rotate-90" />
                <span>Thêm hình ảnh</span>
            </button>
        </motion.div>
    )
}
