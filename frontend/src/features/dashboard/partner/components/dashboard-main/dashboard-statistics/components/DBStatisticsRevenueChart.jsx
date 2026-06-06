import React, { useState } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function DBStatisticsRevenueChart({ chartData }) {
    const [selectedMetric, setSelectedMetric] = useState('revenue')

    const formatYAxis = (value) => {
        if (selectedMetric === 'revenue') {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', notation: "compact", compactDisplay: "short" }).format(value)
        }
        return value
    }

    const formatTooltipValue = (value) => {
        if (selectedMetric === 'revenue') {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
        }
        return value
    }

    const metricConfig = {
        revenue: { label: 'Doanh thu', color: '#003b95' },
        bookings: { label: 'Khách đặt', color: '#2563eb' },
        comments: { label: 'Đánh giá', color: '#ea580c' }
    }

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
                <h2 className="text-xl font-bold text-gray-900">Biểu đồ thống kê</h2>
                <select 
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className={clsx(
                        "p-2 rounded-lg outline-none cursor-pointer transition-colors",
                        "bg-gray-50 border border-gray-200",
                        "text-sm text-gray-700",
                        "hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    )}
                >
                    <option value="revenue">Doanh thu</option>
                    <option value="bookings">Số lượng khách đặt</option>
                    <option value="comments">Số lượng đánh giá</option>
                </select>
            </div>

            <div className="flex-1 w-full" style={{ minHeight: '300px' }}>
                {chartData && chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={chartData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            barSize={32}
                        >
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
                                tickFormatter={formatYAxis}
                            />
                            <Tooltip 
                                formatter={(value) => [formatTooltipValue(value), metricConfig[selectedMetric].label]}
                                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#111827', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Bar 
                                dataKey={selectedMetric}
                                fill={metricConfig[selectedMetric].color} 
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Đang tải dữ liệu...
                    </div>
                )}
            </div>
        </motion.div>
    )
}
