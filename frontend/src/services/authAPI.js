import { parsedData } from "../helpers/parseInput"

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

// export const registerUser = (data) => {
//     return fetch("http://localhost:8000/api/users", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(parsedData(data))
//     }).then(
//         response => response
//     )
// }

export const fetchUser = async () => {
    const response = await fetch(`${apiURL}/api/user`, {
        method: "POST",
        // credentials: "include",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json"
        },
    })

    return response
}

export const loginUser = async (data) => {
    const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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

