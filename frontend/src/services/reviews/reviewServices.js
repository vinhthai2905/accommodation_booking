import { buildTokenHeader } from "../../helpers/authentication/buildTokenHeader"
import { selectContentType } from "../../helpers/partner-onboarding/selectContentType"

const apiURL = import.meta.env.VITE_API_URL

export const createUserReview = async (payload) => {
    // Extract id_booking from the payload to use in the URL
    const { id_booking, ...restPayload } = payload
    
    const headers = buildTokenHeader()
    const body = selectContentType(restPayload, headers)

    const response = await fetch(`${apiURL}/api/user/review/${id_booking}`, {
        method: "POST",
        headers,
        body
    })

    if (!response.ok) {
        let errorMessage = `Response status: ${response.status}`
        try {
            const errorData = await response.json()
            errorMessage = errorData.detail || errorData.non_field_errors?.[0] || JSON.stringify(errorData)
        } catch (e) {
            // Ignore JSON parse errors for non-JSON responses
        }
        throw new Error(errorMessage)
    }

    return await response.json()
}

export const fetchHotelReviews = async (id_hotel) => {
    const response = await fetch(`${apiURL}/api/hotel/${id_hotel}/reviews`, {
        method: "GET",
    })

    if (!response.ok) {
        let errorMessage = `Response status: ${response.status}`
        try {
            const errorData = await response.json()
            errorMessage = errorData.detail || JSON.stringify(errorData)
        } catch (e) {
            // Ignore
        }
        throw new Error(errorMessage)
    }

    return await response.json()
}
