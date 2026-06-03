import { useMutation, useQueryClient } from "@tanstack/react-query"

import { verifyEmail } from "../../../services/authentication/authServices"

export const useUserVerifyEmailMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ uid, token }) => {
            const data = await verifyEmail(uid, token)
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] })
        }
    })
}
