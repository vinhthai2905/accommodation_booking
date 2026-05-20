import { ArrowLeft, Sparkles, Search, X } from "lucide-react"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"

export default function DBHotelAmenitiesHeader({ categorySearchTerm, setCategorySearchTerm, amenitySearchTerm, setAmenitiesSearchTerm }) {
    const navigate = useNavigate()

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-6 md:p-8 rounded-2xl bg-linear-to-r from-[#003b95] to-blue-700 text-white shadow-lg relative overflow-hidden"
            >
                <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10">
                    <Sparkles size={260} />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-blue-500/30 rounded-full text-blue-150 border border-blue-400/20">
                        Quản lý tiện ích
                    </span>
                    <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">Tiện nghi khách sạn</h1>
                    <p className="mt-2 text-blue-100 text-sm md:text-base font-medium">
                        Chọn các dịch vụ và tiện nghi có sẵn tại khách sạn của bạn. Dữ liệu sẽ tự động lưu và hiển thị trực tiếp trên trang chi tiết khách sạn để giúp thu hút nhiều khách hàng đặt phòng hơn.
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm"
            >
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm danh mục..."
                        className="w-full rounded-xl px-4 py-2.5 pl-10 pr-10 outline-none border border-gray-200 focus:border-[#003b95] focus:ring-2 focus:ring-blue-100 text-sm text-gray-900 transition-all duration-250 bg-gray-50/20"
                        value={categorySearchTerm}
                        onChange={(e) => setCategorySearchTerm(e.target.value)}
                    />
                    {categorySearchTerm && (
                        <button
                            onClick={() => setCategorySearchTerm("")}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm tiện ích..."
                        className="w-full rounded-xl px-4 py-2.5 pl-10 pr-10 outline-none border border-gray-200 focus:border-[#003b95] focus:ring-2 focus:ring-blue-100 text-sm text-gray-900 transition-all duration-250 bg-gray-50/20"
                        value={amenitySearchTerm}
                        onChange={(e) => setAmenitiesSearchTerm(e.target.value)}
                    />
                    {amenitySearchTerm && (
                        <button
                            onClick={() => setAmenitiesSearchTerm("")}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </motion.div>
        </>
    )
}
