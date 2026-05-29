import DBListApplications from "../components/dashboard-admin-main/dashboard-review-applications/list-page/DBListApplications"

export default function DashboardReviewApplications() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Xét duyệt hồ sơ đối tác</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Quản lý các yêu cầu đăng ký chỗ nghỉ mới từ đối tác.
                </p>
            </div>
            
            <DBListApplications />
        </div>
    )
}
