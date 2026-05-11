const apiURL = import.meta.env.VITE_API_URL

// export const registerUser = (data) => {
//     return fetch("http://localhost:8000/api/users", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(parsedPythonData(data))
//     }).then(
//         response => response
//     )
// }

export const fetchAuthUser = async () => {
    const response = await fetch(`${apiURL}/api/auth/user/refresh`, {
        method: "POST",
        // credentials: "include",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json"
        },
    })

    return response
}

export const loginAuthUser = async (data) => {
    const response = await fetch("http://localhost:8000/api/auth/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    return response
}

export const logoutAuthUser = async () => {
    const response = await fetch("http://localhost:8000/api/auth/user/logout", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response
}

