import React, { useState } from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'
import { motion } from 'framer-motion'
import clsx from 'clsx'

// Mock Data
const dataWeekly = [
    { name: 'T2', revenue: 4000 },
    { name: 'T3', revenue: 3000 },
    { name: 'T4', revenue: 5000 },
    { name: 'T5', revenue: 4500 },
    { name: 'T6', revenue: 6000 },
    { name: 'T7', revenue: 8000 },
    { name: 'CN', revenue: 7500 },
]

const dataMonthly = [
    { name: 'Tuần 1', revenue: 15000 },
    { name: 'Tuần 2', revenue: 18000 },
    { name: 'Tuần 3', revenue: 12000 },
    { name: 'Tuần 4', revenue: 21000 },
]

const dataQuarterly = [
    { name: 'Tháng 1', revenue: 65000 },
    { name: 'Tháng 2', revenue: 59000 },
    { name: 'Tháng 3', revenue: 80000 },
]

const dataYearly = [
    { name: 'Q1', revenue: 204000 },
    { name: 'Q2', revenue: 250000 },
    { name: 'Q3', revenue: 210000 },
    { name: 'Q4', revenue: 280000 },
]

export default function DBStatisticsRevenueChart() {
    const [timeFilter, setTimeFilter] = useState('weekly')

    const getChartData = () => {
        switch (timeFilter) {
            case 'monthly': return dataMonthly
            case 'quarterly': return dataQuarterly
            case 'yearly': return dataYearly
            case 'weekly':
            default:
                return dataWeekly
        }
    }

    const data = getChartData()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={clsx(
                "flex flex-col xl:col-span-2",
                "p-6 rounded-2xl",
                "bg-white border border-gray-200 shadow-sm"
            )}
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Doanh thu tổng quan</h2>
                <select 
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className={clsx(
                        "p-2 rounded-lg outline-none cursor-pointer transition-colors",
                        "bg-gray-50 border border-gray-200",
                        "text-sm text-gray-700",
                        "hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    )}
                >
                    <option value="weekly">7 ngày qua</option>
                    <option value="monthly">Tháng này</option>
                    <option value="quarterly">Quý này</option>
                    <option value="yearly">Năm nay</option>
                </select>
            </div>

            <div className="flex-1 w-full" style={{ minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#003b95" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#003b95" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            stroke="#6b7280" 
                            tick={{ fill: '#6b7280', fontSize: 12 }} 
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis 
                            stroke="#6b7280" 
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#111827', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ color: '#003b95', fontWeight: 600 }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="#003b95" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorRevenue)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}
