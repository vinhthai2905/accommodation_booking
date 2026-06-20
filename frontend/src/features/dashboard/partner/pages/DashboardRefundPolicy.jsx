import DBRefundPolicy from "../components/dashboard-main/dashboard-policy-refund/list-page/section/DBRefundPolicy"

export default function DashboardRefundPolicy() {
    return (
        <div className="flex-1 w-full flex flex-col h-screen overflow-y-auto bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto w-full">
                <DBRefundPolicy />
            </div>
        </div>
    )
}
