import { parsedData } from "../helpers/parseInput"

export const registerUser = async (data) => {
    const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(parsedData(data))
    })

    return response
}

// export const fetchUser = async (data) => {

// }