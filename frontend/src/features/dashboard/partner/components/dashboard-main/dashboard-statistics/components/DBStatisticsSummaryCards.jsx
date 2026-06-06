import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { DollarSign, ShoppingCart, MessageSquare } from 'lucide-react'

export default function DBStatisticsSummaryCards({ summary, isLoading }) {
    if (isLoading) {
        return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
            ))}
        </div>
    }

    const cards = [
        {
            title: 'Doanh thu',
            value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(summary?.total_revenue || 0),
            icon: <DollarSign className="w-6 h-6 text-green-600" />,
            bgColor: 'bg-green-50',
            textColor: 'text-green-700'
        },
        {
            title: 'Khách đặt',
            value: summary?.total_bookings || 0,
            icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-700'
        },
        {
            title: 'Đánh giá',
            value: summary?.total_comments || 0,
            icon: <MessageSquare className="w-6 h-6 text-orange-600" />,
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-700'
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between"
                >
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500 mb-1">{card.title}</span>
                        <span className="text-2xl font-bold text-gray-900">{card.value}</span>
                    </div>
                    <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center", card.bgColor)}>
                        {card.icon}
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
