import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const data = [
    { name: 'Thành công', value: 65, color: '#10b981' }, // Emerald
    { name: 'Hủy phòng', value: 20, color: '#f43f5e' }, // Rose
    { name: 'Hoàn tiền', value: 15, color: '#f59e0b' }, // Amber
]

export default function DBStatisticBookingStatusChart() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={clsx(
                "flex flex-col h-full",
                "p-6 rounded-2xl",
                "bg-white border border-gray-200 shadow-sm"
            )}
        >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tỷ lệ Trạng thái Đặt phòng</h2>

            <div className="flex-1 w-full h-[300px] flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#111827', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ color: '#111827', fontWeight: 600 }}
                            formatter={(value) => `${value}%`}
                        />
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%"
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Legend 
                            verticalAlign="bottom" 
                            height={36}
                            iconType="circle"
                            formatter={(value) => <span className="text-gray-700 ml-1">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute top-[41%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <span className="block text-3xl font-bold text-gray-900">100%</span>
                    <span className="block text-xs text-gray-500 mt-1">Tổng Booking</span>
                </div>
            </div>
        </motion.div>
    )
}
