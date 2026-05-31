import { buildTokenHeader } from "../../helpers/authentication/buildTokenHeader"
import { selectContentType } from "../../helpers/partner-onboarding/selectContentType"

const apiURL = import.meta.env.VITE_API_URL


export const fetchHotelTypes = async () => {
    const headers = buildTokenHeader()
    const response = await fetch(`${apiURL}/api/partner/hotel-types`, {
        method: "GET",
        headers
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }

    return await response.json()
}

export const submitHotelRegistration = async (data) => {
    const headers = buildTokenHeader()
    const body = selectContentType(data, headers)

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
    const headers = buildTokenHeader()
    const response = await fetch(`${apiURL}/api/partner/hotel/register`, {
        method: "GET",
        headers
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }

    return await response.json()
}
