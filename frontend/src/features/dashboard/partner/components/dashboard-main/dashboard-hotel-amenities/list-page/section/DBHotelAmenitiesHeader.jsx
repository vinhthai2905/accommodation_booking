import { ArrowLeft, Sparkles } from "lucide-react"
import { useNavigate } from "react-router"

export default function DBHotelAmenitiesHeader({ motion }) {
    const navigate = useNavigate()

    return (
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
    )
}
