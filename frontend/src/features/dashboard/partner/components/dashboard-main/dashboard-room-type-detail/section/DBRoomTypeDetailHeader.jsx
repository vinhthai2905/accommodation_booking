import { ArrowLeft, BedDouble } from "lucide-react"
import { useNavigate } from "react-router"

export default function DBRoomTypeDetailHeader({ motion, roomTypeName }) {
    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
        >
            <div className="flex flex-col items-start gap-2">
                <button
                    type="button"
                    onClick={() => navigate("/partner/dashboard/hotel/room-type")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                    <ArrowLeft size={14} />
                    <span>Quay lại danh sách loại phòng</span>
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 shrink-0">
                        <BedDouble size={20} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Chi tiết loại phòng</h1>
                        {roomTypeName && (
                            <p className="text-gray-500 text-sm mt-0.5">
                                Cấu hình giường cho loại phòng <span className="font-semibold text-gray-700">{roomTypeName}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
