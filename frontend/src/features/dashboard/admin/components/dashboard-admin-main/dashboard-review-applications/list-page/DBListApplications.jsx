import { useState, useEffect } from "react"
import { fetchAdminRegistrations, updateAdminRegistrationStatus } from "../../../../services/adminRegistrationServices"
import { toast } from "react-hot-toast"
import { clsx } from "clsx"
import { CheckCircle, XCircle, Clock, Eye, Download, Search, Filter } from "lucide-react"

export default function DBListApplications() {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState("Tất cả")
    const [updatingId, setUpdatingId] = useState(null)

    const loadApplications = async () => {
        setLoading(true)
        try {
            const data = await fetchAdminRegistrations(filterStatus)
            setApplications(data)
        } catch (error) {
            toast.error("Không thể tải danh sách đơn đăng ký.")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadApplications()
    }, [filterStatus])

    const handleUpdateStatus = async (id, newStatus) => {
        if (!window.confirm(`Bạn có chắc chắn muốn chuyển trạng thái đơn này thành "${newStatus}"?`)) return

        setUpdatingId(id)
        try {
            const payload = { status: newStatus }
            if (newStatus === "Từ chối") {
                const reason = window.prompt("Nhập lý do từ chối:")
                if (reason === null) {
                    setUpdatingId(null)
                    return // User cancelled
                }
                payload.reject_reason = reason
            }

            await updateAdminRegistrationStatus(id, payload)
            toast.success(`Đã cập nhật trạng thái thành ${newStatus}`)
            loadApplications() // Refresh
        } catch (error) {
            toast.error("Cập nhật trạng thái thất bại.")
            console.error(error)
        } finally {
            setUpdatingId(null)
        }
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case "Đã duyệt":
                return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle size={14}/> Đã duyệt</span>
            case "Từ chối":
                return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle size={14}/> Từ chối</span>
            case "Chờ duyệt":
                return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock size={14}/> Chờ duyệt</span>
            default:
                return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return ""
        return new Date(dateString).toLocaleDateString("vi-VN", {
            day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
        })
    }

    const getFullUrl = (url) => {
        if (!url) return ""
        if (url.startsWith("http")) return url
        const baseUrl = import.meta.env.VITE_API_URL || ""
        return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Header & Filter */}
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

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-4">Khách sạn / Khu vực</th>
                            <th scope="col" className="px-6 py-4">Đối tác (Email & SĐT)</th>
                            <th scope="col" className="px-6 py-4">Tài liệu pháp lý</th>
                            <th scope="col" className="px-6 py-4">Ngày đăng ký</th>
                            <th scope="col" className="px-6 py-4">Trạng thái</th>
                            <th scope="col" className="px-6 py-4 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <svg className="animate-spin h-8 w-8 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Đang tải dữ liệu...
                                    </div>
                                </td>
                            </tr>
                        ) : applications.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                    Không có đơn đăng ký nào được tìm thấy.
                                </td>
                            </tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app.id_registration} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">{app.hotel_name}</div>
                                        <div className="text-xs text-gray-500 mt-1">{app.hotel_type_name} • {app.ward_name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-800">{app.user_email}</div>
                                        <div className="text-xs text-gray-500 mt-1">{app.phone_number}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {app.document_url ? (
                                            <a 
                                                href={getFullUrl(app.document_url)} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium"
                                            >
                                                <Eye size={14} /> {app.document_name || "Xem tài liệu"}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">Không có tài liệu</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap text-xs">
                                        {formatDate(app.created_at)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(app.status)}
                                        {app.status === "Từ chối" && app.reject_reason && (
                                            <div className="text-[10px] text-red-500 mt-1 truncate max-w-[150px]" title={app.reject_reason}>
                                                Lý do: {app.reject_reason}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {app.status === "Chờ duyệt" ? (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdateStatus(app.id_registration, "Đã duyệt")}
                                                        disabled={updatingId === app.id_registration}
                                                        className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
                                                    >
                                                        Duyệt
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(app.id_registration, "Từ chối")}
                                                        disabled={updatingId === app.id_registration}
                                                        className="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-medium rounded hover:bg-red-200 disabled:opacity-50 transition-colors"
                                                    >
                                                        Từ chối
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">Đã xử lý</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
