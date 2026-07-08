import { useState, useEffect } from "react"
import { fetchAdminRegistrations } from "../../services/adminRegistrationServices"
import { toast } from "react-hot-toast"

export function useAdminApplicationsList() {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState("Tất cả")

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

    return {
        applications,
        loading,
        filterStatus,
        setFilterStatus,
        loadApplications
    }
}
