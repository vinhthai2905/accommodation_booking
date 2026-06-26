import { Eye, CheckCircle, XCircle, Clock } from "lucide-react"

export default function DBListApplicationsRowDatas({ app, handleViewDocument, downloadingDocId }) {
    const formatDate = (dateString) => {
        if (!dateString) return ""
        return new Date(dateString).toLocaleDateString("vi-VN", {
            day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
        })
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

    return (
        <>
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
                    <button 
                        onClick={() => handleViewDocument(app)}
                        disabled={downloadingDocId === app.id_registration}
                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline text-xs font-medium cursor-pointer disabled:opacity-50"
                    >
                        {downloadingDocId === app.id_registration ? (
                            <><svg className="animate-spin h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Đang mở...</>
                        ) : (
                            <><Eye size={14} /> {app.document_name || "Xem tài liệu"}</>
                        )}
                    </button>
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
        </>
    )
}
