import { useMutation } from "@tanstack/react-query"
import bookingAPI from "../../services/base/bookingAPI"


export function useBumblebeeMutation() {
    return useMutation({
        mutationKey: ["bumblebeeChat"],
        mutationFn: async (message) => {
            const { data } = await bookingAPI.post(`/api/bumblebee/chat`, { message })
            return data
        }
    })
}
