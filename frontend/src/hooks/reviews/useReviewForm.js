import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useState } from "react"

export function useReviewForm(createReviewMutation, navigate, id_booking) {
    const methods = useForm()

    const onSuccessValidatedReview = (data) => {
        // Validation for rating is handled by react-hook-form's register, 
        // but double check just in case.
        if (!data.hotelRating || data.hotelRating === 0) {
            toast.error("Vui lòng chọn số sao đánh giá!")
            return
        }

        const reviewPayload = {
            id_booking,
            rating: data.hotelRating,
            content: data.comment,
        }

        createReviewMutation.mutate(reviewPayload, {
            onSuccess: () => {
                toast.success("Cảm ơn bạn đã gửi đánh giá!")
                setTimeout(() => {
                    navigate("/profile/mytrips.html?tab=past")
                }, 2000)
            }
        })
    }

    return {
        methods,
        onSuccessValidatedReview
    }
}