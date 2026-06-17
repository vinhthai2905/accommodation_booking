import { clsx } from "clsx"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function DBStatCard({ title, value, change, isPositive, icon: Icon, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className={clsx(
            "group relative overflow-hidden",
            "p-6 rounded-2xl",
            "bg-white border border-gray-200 shadow-sm"
            )}
        >
            <div className={clsx(
            "absolute top-0 right-0 -mt-8 -mr-8",
            "w-32 h-32 rounded-bl-full",
            "bg-linear-to-br from-blue-500/10 to-purple-500/10",
            "transition-transform group-hover:scale-110"
            )} />
            <div className={clsx("relative flex justify-between items-start mb-4")}>
            <div>
                <p className={clsx("mb-1 text-sm font-medium text-gray-500")}>{title}</p>
                <h3 className={clsx("text-3xl font-bold text-gray-900")}>{value}</h3>
            </div>
            <div className={clsx("p-3 rounded-xl bg-blue-50")}>
                <Icon size={24} className={clsx("text-blue-600")} />
            </div>
            </div>
            <div className={clsx("relative flex items-center gap-2")}>
            <div className={clsx(
                "flex items-center gap-1 px-2 py-1",
                "rounded-md text-sm font-medium",
                isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            )}>
                {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {change}
            </div>
            <span className={clsx("text-sm text-gray-400")}>so với tháng trước</span>
            </div>
        </motion.div>
    )
}
