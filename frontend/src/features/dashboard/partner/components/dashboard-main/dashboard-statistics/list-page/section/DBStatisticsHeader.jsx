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

        </motion.div>
    )
}
