import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"

export default function DBListHeader({ motion, listLabel, instructionLabel }) {
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
                    onClick={() => navigate("/partner/dashboard/hotel/edit")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                    <ArrowLeft size={14} />
                    <span>Quay lại</span>
                </button>
                <div>
                    <h1 className="mb-1 text-3xl font-bold text-gray-900">{listLabel}</h1>
                    <p className="text-gray-500 text-sm">{instructionLabel}</p>
                </div>
            </div>
        </motion.div>
    )
}
