import React from 'react'
import DBChildrenPolicy from '../components/dashboard-main/dashboard-policy-children/list-page/DBChildrenPolicy'

export default function DashboardChildrenPolicy() {
    return (
        <div className="flex-1 w-full flex flex-col h-screen overflow-y-auto bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto w-full">
                <DBChildrenPolicy />
            </div>
        </div>
    )
}
