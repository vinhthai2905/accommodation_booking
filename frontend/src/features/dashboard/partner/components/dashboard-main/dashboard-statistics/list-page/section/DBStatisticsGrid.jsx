import React from 'react'
import DBStatisticsRevenueChart from '../../components/DBStatisticsRevenueChart'
import DBStatisticsBookingStatusChart from '../../components/DBStatisticsBookingStatusChart'

export default function DBStatisticsGrid() {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Revenue Chart occupies 2 columns on large screens */}
            <div className="xl:col-span-2">
                <DBStatisticsRevenueChart />
            </div>
            
            {/* Booking Status Chart occupies 1 column on large screens */}
            <div className="xl:col-span-1">
                <DBStatisticsBookingStatusChart />
            </div>
        </div>
    )
}
