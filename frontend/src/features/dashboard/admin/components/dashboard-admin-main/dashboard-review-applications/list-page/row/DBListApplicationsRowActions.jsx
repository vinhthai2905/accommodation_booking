export default function DBListApplicationsRowActions({ app, handleUpdateStatus, updatingId }) {
    return (
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
    )
}
