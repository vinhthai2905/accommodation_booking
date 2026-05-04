import { clsx } from "clsx"
import { motion } from "framer-motion"

export default function BookingLoadingScreen({ text = "Đang xử lý..." }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={clsx(
                "fixed inset-0 z-50",
                "flex flex-col items-center justify-center",
                "bg-white",
            )}
        >
            <div className="flex flex-col items-center gap-5">
                <div className="relative h-16 w-16">
                    <div className={clsx(
                        "absolute inset-0",
                        "rounded-full border-4 border-gray-100",
                    )} />
                    <div className={clsx(
                        "absolute inset-0",
                        "animate-spin rounded-full",
                        "border-4 border-transparent border-t-blue-600",
                    )} />
                </div>

                {/* Text */}
                <div className="flex flex-col items-center gap-1 text-center">
                    <p className="text-base font-semibold text-slate-800">{text}</p>
                    <p className="text-sm text-slate-400">Vui lòng không đóng trang này.</p>
                </div>
            </div>
        </motion.div>
    )
}
