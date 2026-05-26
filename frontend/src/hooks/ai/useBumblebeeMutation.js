import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL || ""

export function useBumblebeeMutation() {
    return useMutation({
        mutationKey: ["bumblebeeChat"],
        mutationFn: async (message) => {
            const { data } = await axios.post(`${apiUrl}/api/ai/chat`, { message })
            return data
        }
    })
}
