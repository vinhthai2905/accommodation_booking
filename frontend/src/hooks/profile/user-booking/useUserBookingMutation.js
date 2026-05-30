import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { cancelBooking } from "../../../services/book/bookingServices"

export default function useUserBookingMutation() {
    const queryClient = useQueryClient()

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

    return {
        cancelBookingMutation
    }
}
