import React from 'react'
import DBStatisticsHeader from './section/DBStatisticsHeader'
import DBStatisticsGrid from './section/DBStatisticsGrid'

export default function DBStatisticsPage() {
    return (
        <div className="space-y-8">
            <DBStatisticsHeader />
            <DBStatisticsGrid />
        </div>
    )
}
