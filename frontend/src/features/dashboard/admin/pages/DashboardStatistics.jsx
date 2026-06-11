import DBStatsGrid from "../components/dashboard-admin-main/dashboard-statistics/DBStatsGrid"
import DBHotelTypesChart from "../components/dashboard-admin-main/dashboard-statistics/DBHotelTypesChart"
import DBRecentBookings from "../components/dashboard-admin-main/dashboard-statistics/DBRecentBookings"

import { clsx } from "clsx"
import { motion } from "framer-motion"

export default function DashboardStatistics() {
    return (
        <div className={clsx("space-y-8")}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={clsx("flex justify-between items-end")}
            >
                <div>
                    <h1 className={clsx("mb-2 text-3xl font-bold text-gray-900")}>Tổng quan Dashboard</h1>
                    <p className={clsx("text-gray-500")}>Chào mừng trở lại! Đây là những gì đang diễn ra hôm nay.</p>
                </div>
                <button className={clsx(
                    "px-4 py-2 rounded-lg",
                    "bg-blue-600 hover:bg-blue-700",
                    "text-white font-medium shadow-lg shadow-blue-500/20",
                    "transition-colors"
                )}>
                    Xuất báo cáo
                </button>
            </motion.div>

            <DBStatsGrid />

            <div className={clsx("grid grid-cols-1 xl:grid-cols-3 gap-6")}>
                <DBHotelTypesChart />
                <DBRecentBookings />
            </div>
        </div>
    )
}
