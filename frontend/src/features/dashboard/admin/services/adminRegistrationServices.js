import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"
import bookingAPI from "../../../../services/base/bookingAPI"

export const fetchAdminRegistrations = async (statusFilter = "Tất cả") => {
    let url = `/api/admin/hotel/registrations`
    if (statusFilter && statusFilter !== "Tất cả") {
        url += `?status=${encodeURIComponent(statusFilter)}`
    }

    const { data } = await bookingAPI.get(url, {
        headers: buildTokenHeader()
    })

    return data
}

export const updateAdminRegistrationStatus = async (id, payload) => {
    const { data } = await bookingAPI.patch(`/api/admin/hotel/registrations/${id}`, payload, {
        headers: buildTokenHeader()
    })

    return data
}
