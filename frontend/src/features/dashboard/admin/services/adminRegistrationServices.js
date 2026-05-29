import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

const apiURL = import.meta.env.VITE_API_URL

export const fetchAdminRegistrations = async (statusFilter = "Tất cả") => {
    let url = `${apiURL}/api/admin/hotel/registrations`
    if (statusFilter && statusFilter !== "Tất cả") {
        url += `?status=${encodeURIComponent(statusFilter)}`
    }

    const response = await fetch(url, {
        method: "GET",
        headers: buildTokenHeader()
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }

    return await response.json()
}

export const updateAdminRegistrationStatus = async (id, payload) => {
    const response = await fetch(`${apiURL}/api/admin/hotel/registrations/${id}`, {
        method: "PATCH",
        headers: buildTokenHeader(),
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }

    return await response.json()
}
