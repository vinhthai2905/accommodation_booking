import { useMutation, useQueryClient } from "@tanstack/react-query"

import { verifyEmail } from "../../../services/authentication/authServices"

export const useUserVerifyEmailMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ uid, token }) => {
            const response = await verifyEmail(uid, token)
            if (!response.ok) {
                throw new Error("Xác thực không thành công. ")
            }
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["userProfile"]})
        }
    })
}
