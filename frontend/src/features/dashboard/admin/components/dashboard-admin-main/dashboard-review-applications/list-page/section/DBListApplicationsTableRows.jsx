import DBListApplicationsRow from "../row/DBListApplicationsRow"

export default function DBListApplicationsTableRows({ applications, loading, handleViewDocument, downloadingDocId, handleUpdateStatus, updatingId }) {
    if (loading) {
        return (
            <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                        <svg className="animate-spin h-8 w-8 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Đang tải dữ liệu...
                    </div>
                </td>
            </tr>
        )
    }

    if (applications.length === 0) {
        return (
            <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    Không có đơn đăng ký nào được tìm thấy.
                </td>
            </tr>
        )
    }

    return (
        <>
            {applications.map((app) => (
                <DBListApplicationsRow 
                    key={app.id_registration}
                    app={app}
                    handleViewDocument={handleViewDocument}
                    downloadingDocId={downloadingDocId}
                    handleUpdateStatus={handleUpdateStatus}
                    updatingId={updatingId}
                />
            ))}
        </>
    )
}
