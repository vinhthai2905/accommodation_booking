import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { cancelBooking } from "../../../services/book/bookingServices"
import useCancellationMessage from "./useCancellationMessage"

export default function useUserBookingMutation(refundPolicy, freeCancellationExpiresAt) {
    const queryClient = useQueryClient()
    const { getCancellationMessage } = useCancellationMessage(refundPolicy, freeCancellationExpiresAt)

    const cancelBookingMutation = useMutation({
        mutationFn: cancelBooking,
        onSuccess: () => {
            toast.success("Yêu cầu hủy đơn đặt phòng của bạn đang được xử lý!")
            queryClient.invalidateQueries({ queryKey: ["userBookings"] })
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Hủy phòng thất bại. Vui lòng thử lại.")
        }
    })

    const handleCancelBooking = (booking) => {
        const confirmMessage = getCancellationMessage(booking)

        if (window.confirm(confirmMessage)) {
            cancelBookingMutation.mutate(booking.id_booking)
        }
    }

    return {
        handleCancelBooking,
        cancelBookingMutation
    }
}
