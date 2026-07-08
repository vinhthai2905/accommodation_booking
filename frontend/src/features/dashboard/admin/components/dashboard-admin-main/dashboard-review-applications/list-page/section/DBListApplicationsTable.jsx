import DBListApplicationsTableColumn from "./DBListApplicationsTableColumn"
import DBListApplicationsTableRows from "./DBListApplicationsTableRows"

export default function DBListApplicationsTable({ 
    applications, 
    loading, 
    handleViewDocument, 
    downloadingDocId, 
    handleUpdateStatus, 
    updatingId 
}) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <DBListApplicationsTableColumn />
                <tbody>
                    <DBListApplicationsTableRows 
                        applications={applications}
                        loading={loading}
                        handleViewDocument={handleViewDocument}
                        downloadingDocId={downloadingDocId}
                        handleUpdateStatus={handleUpdateStatus}
                        updatingId={updatingId}
                    />
                </tbody>
            </table>
        </div>
    )
}
