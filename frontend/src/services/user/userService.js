const apiURL = import.meta.env.VITE_API_URL

export const fetchUserProfile = async () => {
    const response = await fetch(`${apiURL}/api/public/users/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json"
        },
    })
    
    if (!response.ok) {
        throw new Error('Failed to fetch user profile')
    }

    return response.json()
}

export const updateUserProfile = async (data) => {
    const response = await fetch(`${apiURL}/api/public/users/me`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    
    if (!response.ok) {
        throw new Error('Failed to update user profile')
    }

    return response.json()
}
