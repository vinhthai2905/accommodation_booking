import StatCard from "../components/authentication/StatCard"

import { motion } from "framer-motion"
import { clsx } from "clsx"
import { Users, DollarSign, Hotel, TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react"

export default function DashboardLanding() {
    const stats = [
        { title: "Total Revenue", value: "$45,231", change: "+20.1%", isPositive: true, icon: DollarSign },
        { title: "Active Users", value: "2,405", change: "+15.2%", isPositive: true, icon: Users },
        { title: "Total Bookings", value: "842", change: "+5.4%", isPositive: true, icon: TrendingUp },
        { title: "Listed Hotels", value: "142", change: "-1.2%", isPositive: false, icon: Hotel },
    ]

    const recentBookings = [
        { id: "BOK-001", user: "Alice Johnson", hotel: "Grand Plaza Hotel", status: "Completed", amount: "$350" },
        { id: "BOK-002", user: "Bob Smith", hotel: "Oceanview Resort", status: "Pendingk", amount: "$890" },
        { id: "BOK-003", user: "Charlie Brown", hotel: "Mountain Retreat", status: "Cancelled", amount: "$120" },
        { id: "BOK-004", user: "Diana Prince", hotel: "City Center Inn", status: "Completed", amount: "$450" },
        { id: "BOK-005", user: "Evan Wright", hotel: "Riverside Lodge", status: "Completed", amount: "$210" },
    ]

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-between items-end"
            >
                <div>
                    <h1 className="mb-2 text-3xl font-bold text-white">Dashboard Overview</h1>
                    <p className="text-gray-400">Welcome back! Here"s what"s happening today.</p>
                </div>
                <button className={clsx(
                    "px-4 py-2 rounded-lg",
                    "bg-blue-600 hover:bg-blue-700",
                    "text-white font-medium shadow-lg shadow-blue-500/20",
                    "transition-colors"
                )}>
                    Generate Report
                </button>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} delay={i * 0.1}  />
                ))}
            </div>

            {/* Sections */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Main Chart Area placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={clsx(
                        "flex flex-col min-h-100 xl:col-span-2",
                        "p-6 rounded-2xl",
                        "bg-gray-800 border border-gray-700"
                    )}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Revenue Overview</h2>
                        <select className={clsx(
                            "p-2 rounded-lg outline-none",
                            "bg-gray-700 border-none",
                            "text-sm text-gray-300",
                            "focus:ring-2 focus:ring-blue-500"
                        )}>
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div className={clsx(
                        "flex flex-1 items-center justify-center",
                        "rounded-xl border-2 border-dashed border-gray-700",
                        "bg-gray-800/50"
                    )}>
                        <p className="text-gray-500">Chart Visualization Placeholder</p>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 rounded-2xl bg-gray-800 border border-gray-700"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
                        <button className={clsx(
                            "p-2 rounded-lg text-gray-400",
                            "hover:bg-gray-700 transition-colors"
                        )}>
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {recentBookings.map((booking, i) => (
                            <div key={i} className={clsx(
                                "flex items-center justify-between",
                                "p-3 rounded-xl hover:bg-gray-700/50",
                                "transition-colors"
                            )}>
                                <div>
                                    <p className="font-medium text-gray-200">{booking.user}</p>
                                    <p className="text-sm text-gray-400">{booking.hotel}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-white">{booking.amount}</p>
                                    <span className={clsx(
                                        "inline-block mt-1 px-2 py-1 rounded-md text-xs font-medium",
                                        booking.status === "Completed" && "bg-emerald-500/10 text-emerald-400",
                                        booking.status === "Pending" && "bg-amber-500/10 text-amber-400",
                                        booking.status === "Cancelled" && "bg-rose-500/10 text-rose-400"
                                    )}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
