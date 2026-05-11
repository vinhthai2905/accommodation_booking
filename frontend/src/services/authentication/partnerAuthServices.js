import { parsePythonData } from "../../helpers/common/parsePythonData"

const apiURL = import.meta.env.VITE_API_URL

export const registerPartner = async (data) => {
    const response = await fetch(`${apiURL}/api/partners`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(parsePythonData(data))
    })

    return response
}