import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { sendVerificationEmail } from "../../../services/user/userEmailServices"

export default function useUserEmailMutation() {
    const mutationSendEmail = useMutation({
        mutationFn: () => sendVerificationEmail(),
    })

    const handleSendVerificationEmail = () => {
        mutationSendEmail.mutate(null, {
            onSuccess: (data) => toast.success("Email xác minh đã được gửi!"),
            onError: (error) => toast.error("Gửi email thất bại. Vui lòng thử lại sau."),
        })
    }

    return {
        handleSendVerificationEmail,
        isSending: mutationSendEmail.isPending
    }
}
