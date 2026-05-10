import { AlertCircle } from "lucide-react"

export default function BookingErrorState({ motion }) {
    return (
        <motion.div 
            key="error" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center py-16 gap-3 text-center"
        >
            <AlertCircle size={40} className="text-rose-400" />
            <p className="text-slate-700 font-semibold">Không thể tải đặt phòng</p>
            <p className="text-sm text-slate-400">Vui lòng thử lại sau.</p>
        </motion.div>
    )
}