import { buildTokenHeader } from "../../helpers/authentication/buildTokenHeader"
import { selectContentType } from "../../helpers/partner-onboarding/selectContentType"

const apiURL = import.meta.env.VITE_API_URL

export const createUserReview = async (payload) => {
    const headers = buildTokenHeader()
    const body = selectContentType(payload, headers)

    const response = await fetch(`${apiURL}/api/user/reviews/create`, {
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
