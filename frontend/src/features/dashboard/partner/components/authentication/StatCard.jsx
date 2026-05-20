import { clsx } from "clsx"
import { Icon, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function StatCard({ title, value, change, isPositive, delay, motion }) {
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        className={clsx(
            "group relative overflow-hidden",
            "p-6 rounded-2xl",
            "bg-gray-800 border border-gray-700"
        )}
    >
        <div className={clsx(
            "absolute top-0 right-0 -mt-8 -mr-8",
            "w-32 h-32 rounded-bl-full",
            "bg-linear-to-br from-blue-500/10 to-purple-500/10",
            "transition-transform group-hover:scale-110"
        )} />
        <div className="relative flex justify-between items-start mb-4">
            <div>
                <p className="mb-1 text-sm font-medium text-gray-400">{title}</p>
                <h3 className="text-3xl font-bold text-white">{value}</h3>
            </div>
            <div className="p-3 rounded-xl bg-gray-700/50">
                <Icon size={24} className="text-blue-400" />
            </div>
        </div>
        <div className="relative flex items-center gap-2">
            <div className={clsx(
                "flex items-center gap-1 px-2 py-1",
                "rounded-md text-sm font-medium",
                isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
            )}>
                {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {change}
            </div>
            <span className="text-sm text-gray-500">vs last month</span>
        </div>
    </motion.div>
}