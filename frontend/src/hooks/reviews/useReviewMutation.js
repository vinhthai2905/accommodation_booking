import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserReview } from "../../services/reviews/reviewServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function useReviewMutation() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const createReviewMutation = useMutation({
        mutationFn: createUserReview,
        onSuccess: () => {
            // Invalidate booking queries so that the booking reflects the review state if needed
            queryClient.invalidateQueries({ queryKey: ["user-bookings"] })
        },
        onError: (error) => {
            toast.error(error.message || "Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!")
        }
    });

    return {
        createReviewMutation
    };
}
