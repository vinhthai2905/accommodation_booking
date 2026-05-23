import { buildTokenHeader } from "../../../helpers/authentication/buildTokenHeader"

const apiURL = import.meta.env.VITE_API_URL

export const fetchHotelTypes = async () => {
    const response = await fetch(`${apiURL}/api/partner/hotel-types`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }

    return await response.json()
}

export const fetchWards = async () => {
    const response = await fetch(`${apiURL}/api/location/ward`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }

    return await response.json()
}

export const submitHotelRegistration = async (data) => {
    const headers = buildTokenHeader()
    let body
    if (data instanceof FormData) {
        delete headers["Content-Type"]
        body = data
    } else {
        body = JSON.stringify(data)
    }

    const response = await fetch(`${apiURL}/api/partner/hotel/register`, {
        method: "POST",
        headers,
        body
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.stringify(errorData) || `Response status: ${response.status}`)
    }

    return await response.json()
}

export const fetchHotelRegistrationStatus = async () => {
    const response = await fetch(`${apiURL}/api/partner/hotel/register`, {
        method: "GET",
        headers: buildTokenHeader()
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }

    return await response.json()
}
