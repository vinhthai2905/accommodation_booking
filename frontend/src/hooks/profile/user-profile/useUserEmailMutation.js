import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { sendVerificationEmail } from "../../../services/user/userEmailServices"

export default function useUserEmailMutation(setIsVerificationExpired) {
    const queyrClient = useQueryClient()
    const mutationSendEmail = useMutation({
        mutationFn: () => sendVerificationEmail(),
    })

    const handleSendVerificationEmail = () => {
        mutationSendEmail.mutate(null, {
            onSuccess: (data) => {
                toast.success("Email xác minh đã được gửi!")
                setIsVerificationExpired(false)
                queyrClient.invalidateQueries({queryKey: ["userProfile"]})
            },
            onError: (error) => (
                setIsVerificationExpired(true)
            ),
        })
    }

    return {
        handleSendVerificationEmail,
        isSending: mutationSendEmail.isPending
    }
}
