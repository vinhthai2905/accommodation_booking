import { clsx } from "clsx"
import { motion } from "framer-motion"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

import { useAdminHotelTypeStats } from "../../../../../../hooks/dashboard/admin/statistics-hooks/useAdminStatistics"


const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899', '#84cc16']

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload
        return (
            <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-xl">
                <p className="text-gray-900 font-medium mb-1">{data.name}</p>
                <p className="text-gray-500 text-sm">
                    Tổng số khách sạn: <span className="text-blue-600 font-bold ml-1">{data.count}</span>
                </p>
            </div>
        )
    }
    return null
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null 
    
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text 
            x={x} 
            y={y} 
            fill="white" 
            textAnchor="middle" 
            dominantBaseline="central" 
            fontSize={12} 
            fontWeight="bold"
            className="drop-shadow-md"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

export default function DBHotelTypesChart() {
    const { data: hotelTypeStats, isPending: isStatsPending } = useAdminHotelTypeStats()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={clsx(
                "flex flex-col min-h-100 xl:col-span-2",
                "p-6 rounded-2xl",
                "bg-white border border-gray-200 shadow-sm"
            )}
        >
            <div className={clsx("flex items-center justify-between mb-6")}>
                <h2 className={clsx("text-xl font-bold text-gray-900")}>Phân bố loại khách sạn</h2>
            </div>
            <div className={clsx(
                "flex flex-1 items-center justify-center h-80",
                "rounded-xl",
                "bg-gray-50/50"
            )}>
                {isStatsPending ? (
                    <p className={clsx("text-gray-500 animate-pulse")}>Đang tải thống kê...</p>
                ) : hotelTypeStats && hotelTypeStats.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={hotelTypeStats}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="count"
                                stroke="transparent"
                                label={renderCustomizedLabel}
                                labelLine={false}
                            >
                                {hotelTypeStats.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend 
                                verticalAlign="bottom" 
                                height={36}
                                formatter={(value) => <span className="text-gray-700 font-medium">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className={clsx("text-gray-500")}>Không có dữ liệu</p>
                )}
            </div>
        </motion.div>
    )
}
