import { Filter } from "lucide-react"

export default function DBListApplicationsToolBar({ filterStatus, setFilterStatus, loadApplications }) {
    return (
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Danh sách Đơn đăng ký Đối tác</h2>
                <p className="text-sm text-gray-500 mt-1">Quản lý và xét duyệt các yêu cầu đăng ký chỗ nghỉ mới</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full outline-none transition-colors"
                    >
                        <option value="Tất cả">Tất cả trạng thái</option>
                        <option value="Chờ duyệt">Chờ duyệt</option>
                        <option value="Đã duyệt">Đã duyệt</option>
                        <option value="Từ chối">Từ chối</option>
                    </select>
                </div>
                <button 
                    onClick={loadApplications}
                    className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                    title="Làm mới"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
            </div>
        </div>
    )
}
