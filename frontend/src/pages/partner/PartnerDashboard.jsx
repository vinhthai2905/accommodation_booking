import { Users, DollarSign, Hotel, TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const StatCard = ({ title, value, change, isPositive, icon: Icon, delay }) => (
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
        <div className={clsx("relative flex justify-between items-start mb-4")}>
            <div>
                <p className={clsx("mb-1 text-sm font-medium text-gray-400")}>{title}</p>
                <h3 className={clsx("text-3xl font-bold text-white")}>{value}</h3>
            </div>
            <div className={clsx("p-3 rounded-xl bg-gray-700/50")}>
                <Icon size={24} className={clsx("text-blue-400")} />
            </div>
        </div>
        <div className={clsx("relative flex items-center gap-2")}>
            <div className={clsx(
                "flex items-center gap-1 px-2 py-1",
                "rounded-md text-sm font-medium",
                isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
            )}>
                {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {change}
            </div>
            <span className={clsx("text-sm text-gray-500")}>vs last month</span>
        </div>
    </motion.div>
);

export default function PartnerDashboard() {
    const stats = [
        { title: "Total Revenue", value: "$45,231", change: "+20.1%", isPositive: true, icon: DollarSign },
        { title: "Active Users", value: "2,405", change: "+15.2%", isPositive: true, icon: Users },
        { title: "Total Bookings", value: "842", change: "+5.4%", isPositive: true, icon: TrendingUp },
        { title: "Listed Hotels", value: "142", change: "-1.2%", isPositive: false, icon: Hotel },
    ];

    const recentBookings = [
        { id: "BOK-001", user: "Alice Johnson", hotel: "Grand Plaza Hotel", status: "Completed", amount: "$350" },
        { id: "BOK-002", user: "Bob Smith", hotel: "Oceanview Resort", status: "Pending", amount: "$890" },
        { id: "BOK-003", user: "Charlie Brown", hotel: "Mountain Retreat", status: "Cancelled", amount: "$120" },
        { id: "BOK-004", user: "Diana Prince", hotel: "City Center Inn", status: "Completed", amount: "$450" },
        { id: "BOK-005", user: "Evan Wright", hotel: "Riverside Lodge", status: "Completed", amount: "$210" },
    ];

    return (
        <div className={clsx("space-y-8")}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={clsx("flex justify-between items-end")}
            >
                <div>
                    <h1 className={clsx("mb-2 text-3xl font-bold text-white")}>Dashboard Overview</h1>
                    <p className={clsx("text-gray-400")}>Welcome back! Here's what's happening today.</p>
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
            <div className={clsx("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6")}>
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} delay={i * 0.1} />
                ))}
            </div>

            {/* Sections */}
            <div className={clsx("grid grid-cols-1 xl:grid-cols-3 gap-6")}>
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
                    <div className={clsx("flex items-center justify-between mb-6")}>
                        <h2 className={clsx("text-xl font-bold text-white")}>Revenue Overview</h2>
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
                        <p className={clsx("text-gray-500")}>Chart Visualization Placeholder</p>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className={clsx("p-6 rounded-2xl bg-gray-800 border border-gray-700")}
                >
                    <div className={clsx("flex items-center justify-between mb-6")}>
                        <h2 className={clsx("text-xl font-bold text-white")}>Recent Bookings</h2>
                        <button className={clsx(
                            "p-2 rounded-lg text-gray-400",
                            "hover:bg-gray-700 transition-colors"
                        )}>
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    <div className={clsx("space-y-4")}>
                        {recentBookings.map((booking, i) => (
                            <div key={i} className={clsx(
                                "flex items-center justify-between",
                                "p-3 rounded-xl hover:bg-gray-700/50",
                                "transition-colors"
                            )}>
                                <div>
                                    <p className={clsx("font-medium text-gray-200")}>{booking.user}</p>
                                    <p className={clsx("text-sm text-gray-400")}>{booking.hotel}</p>
                                </div>
                                <div className={clsx("text-right")}>
                                    <p className={clsx("font-medium text-white")}>{booking.amount}</p>
                                    <span className={clsx(
                                        "inline-block mt-1 px-2 py-1 rounded-md text-xs font-medium",
                                        booking.status === 'Completed' && "bg-emerald-500/10 text-emerald-400",
                                        booking.status === 'Pending' && "bg-amber-500/10 text-amber-400",
                                        booking.status === 'Cancelled' && "bg-rose-500/10 text-rose-400"
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
