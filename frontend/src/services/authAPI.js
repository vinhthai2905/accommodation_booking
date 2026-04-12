import { parsedData } from "../helpers/parseInput"

export const registerUser = async (data) => {
    const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(parsedData(data))
    })

    return response
}

export const fetchUser = async () => {
    const response = await fetch("http://localhost:8000/api/user", {
        method: "POST",
        // credentials: "include",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json"
        },
    })

    return response
}

export const logoutUser = async () => {
    const response = await fetch("http://localhost:8000/api/user/logout", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response
}