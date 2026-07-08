import DBListApplicationsRowDatas from "./DBListApplicationsRowDatas"
import DBListApplicationsRowActions from "./DBListApplicationsRowActions"

export default function DBListApplicationsRow({ app, handleViewDocument, downloadingDocId, handleUpdateStatus, updatingId }) {
    return (
        <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
            <DBListApplicationsRowDatas 
                app={app} 
                handleViewDocument={handleViewDocument}
                downloadingDocId={downloadingDocId}
            />
            <DBListApplicationsRowActions 
                app={app}
                handleUpdateStatus={handleUpdateStatus}
                updatingId={updatingId}
            />
        </tr>
    )
}
