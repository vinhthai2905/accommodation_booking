import React, { useState } from 'react'
import DBStatisticsHeader from './section/DBStatisticsHeader'
import DBStatisticsGrid from './section/DBStatisticsGrid'
import DBStatisticsSummaryCards from '../components/DBStatisticsSummaryCards'
import { usePartnerStatistics } from '../../../../../../../hooks/dashboard/partner/booking-hooks/services/usePartnerStatistics'

export default function DBStatisticsPage() {
    const [timeFilter, setTimeFilter] = useState('weekly')
    const { data: statsData, isLoading } = usePartnerStatistics(timeFilter)

    return (
        <div className="space-y-8">
            <DBStatisticsHeader />
            <div className="flex justify-end mb-4">
                <select 
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="p-2 rounded-lg outline-none cursor-pointer transition-colors bg-gray-50 border border-gray-200 text-sm text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                >
                    <option value="weekly">7 ngày qua</option>
                    <option value="monthly">Tháng này</option>
                    <option value="quarterly">Quý này</option>
                    <option value="yearly">Năm nay</option>
                </select>
            </div>
            <DBStatisticsSummaryCards summary={statsData?.summary} isLoading={isLoading} />
            <DBStatisticsGrid chartData={statsData?.chart_data} />
        </div>
    )
}
