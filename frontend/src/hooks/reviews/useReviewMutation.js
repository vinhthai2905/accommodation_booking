import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUserReview } from "../../services/reviews/userReviewServices"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"

export function useReviewMutation() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const createReviewMutation = useMutation({
        mutationFn: createUserReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-bookings"] })
        },
        onError: (error) => {
            let errorMessage = error.message
            if (error.response && error.response.data) {
                const errorData = error.response.data
                errorMessage = errorData.detail || errorData.non_field_errors?.[0] || JSON.stringify(errorData)
            }
            toast.error(errorMessage || "Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!")
        }
    });

    return {
        createReviewMutation
    };
}
