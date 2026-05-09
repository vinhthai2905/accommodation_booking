import { parsedData } from "../../helpers/parseInput"

const apiURL = import.meta.env.VITE_API_URL

export const registerUser = async (data) => {
    const response = await fetch(`${apiURL}/api/users`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(parsedData(data))
    })

    return response
}