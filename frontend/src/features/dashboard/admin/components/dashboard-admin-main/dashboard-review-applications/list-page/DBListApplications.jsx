import { useAdminApplicationsList } from "../../../../hotel-application-hooks/common/useAdminApplicationsList"
import { useAdminApplicationActions } from "../../../../hotel-application-hooks/common/useAdminApplicationActions"
import DBListApplicationsToolBar from "./section/DBListApplicationsToolBar"
import DBListApplicationsTable from "./section/DBListApplicationsTable"

export default function DBListApplications() {
    const {
        applications,
        loading,
        filterStatus,
        setFilterStatus,
        loadApplications
    } = useAdminApplicationsList()

    const {
        updatingId,
        downloadingDocId,
        handleUpdateStatus,
        handleViewDocument
    } = useAdminApplicationActions(loadApplications)

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <DBListApplicationsToolBar 
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                loadApplications={loadApplications}
            />
            
            <DBListApplicationsTable 
                applications={applications}
                loading={loading}
                handleViewDocument={handleViewDocument}
                downloadingDocId={downloadingDocId}
                handleUpdateStatus={handleUpdateStatus}
                updatingId={updatingId}
            />
        </div>
    )
}
