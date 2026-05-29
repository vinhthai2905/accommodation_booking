import { clsx } from "clsx"
import { Link } from "lucide-react"
import { Plane } from "lucide-react"
import { motion } from "framer-motion"

export default function BookingEmptyList({ activeTab, emptyContentCurrentTab }) {
    return (
        <motion.div key={activeTab + "-empty"} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-20 gap-4">
            <h3 className="text-lg font-bold text-slate-800">{emptyContentCurrentTab.title}</h3>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">{emptyContentCurrentTab.desc}</p>
            {activeTab === "upcoming" && (
                <Link to="/index" className={clsx(
                    "mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl",
                    "bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold",
                    "transition-colors shadow-md shadow-blue-200"
                )}>
                    <Plane size={16} /> Tìm chuyến đi
                </Link>
            )}
        </motion.div>

    )
}