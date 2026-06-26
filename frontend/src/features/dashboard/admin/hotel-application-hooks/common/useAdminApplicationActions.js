import { useState } from "react"
import { updateAdminRegistrationStatus, downloadAdminRegistrationDocument } from "../../services/adminRegistrationServices"
import { toast } from "react-hot-toast"

export function useAdminApplicationActions(onUpdateSuccess) {
    const [updatingId, setUpdatingId] = useState(null)
    const [downloadingDocId, setDownloadingDocId] = useState(null)

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
            if (onUpdateSuccess) {
                onUpdateSuccess() // Refresh list
            }
        } catch (error) {
            toast.error("Cập nhật trạng thái thất bại.")
            console.error(error)
        } finally {
            setUpdatingId(null)
        }
    }

    const handleViewDocument = async (app) => {
        if (downloadingDocId) return
        setDownloadingDocId(app.id_registration)
        try {
            const blob = await downloadAdminRegistrationDocument(app.id_registration)
            const objectUrl = URL.createObjectURL(blob)
            window.open(objectUrl, "_blank")
        } catch (error) {
            toast.error("Không thể tải tài liệu. File có thể bị lỗi hoặc không tồn tại.")
            console.error(error)
        } finally {
            setDownloadingDocId(null)
        }
    }

    return {
        updatingId,
        downloadingDocId,
        handleUpdateStatus,
        handleViewDocument
    }
}
