import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { Download } from 'lucide-react'

export default function DBSStatisticsHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"
        >
            <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Tổng quan Thống kê</h1>
                <p className="text-gray-500">Xem hiệu suất kinh doanh và báo cáo đặt phòng của bạn.</p>
            </div>
            <button className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "bg-blue-600 hover:bg-blue-700",
                "text-white font-medium shadow-lg shadow-blue-500/20",
                "transition-colors"
            )}>
                <Download size={18} />
                <span>Xuất báo cáo</span>
            </button>
        </motion.div>
    )
}
