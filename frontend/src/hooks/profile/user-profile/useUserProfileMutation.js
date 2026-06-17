import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { updateUserProfile } from "../../../services/user/userServices"

export default function useUserProfileMutation() {
    const queryClient = useQueryClient()

    const mutationProfile = useMutation({
        mutationFn: (payload) => updateUserProfile(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] })
            queryClient.invalidateQueries({ queryKey: ["fetchAuthUser"] })
        },
    })

    const handleMutatingField = (fieldName, value) => {
        const payload = { personal_info: { [fieldName]: value } }
        mutationProfile.mutate(payload, {
            onSuccess: () => toast.success("Cập nhật thành công!"),
            onError: () => toast.error("Cập nhật thất bại. Vui lòng thử lại."),
        })
    }

    const handleMutatingName = (firstName, lastName) => {
        const payload = { personal_info: { first_name: firstName, last_name: lastName } }
        mutationProfile.mutate(payload, {
            onSuccess: () => toast.success("Cập nhật thành công!"),
            onError: () => toast.error("Cập nhật thất bại. Vui lòng thử lại."),
        })
    }

    return {
        handleMutatingField,
        handleMutatingName
    }
}

