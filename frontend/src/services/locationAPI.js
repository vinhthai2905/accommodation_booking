const apiURL = import.meta.env.VITE_API_URL

export const fetchWard = async () => {
    const response = await fetch(`${apiURL}/api/location/ward`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    return await response.json()
}