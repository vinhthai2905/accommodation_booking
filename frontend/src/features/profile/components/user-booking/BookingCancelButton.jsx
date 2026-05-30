import { clsx } from "clsx"
import { Loader2 } from "lucide-react"

import useUserBookingMutation from "../../../../hooks/profile/user-booking/useUserBookingMutation"

export default function BookingCancelButton({ booking }) {
    const { cancelBookingMutation } = useUserBookingMutation()

    const handleCancel = () => {
        if (window.confirm("Bạn có chắc chắn muốn hủy đặt phòng này?")) {
            cancelBookingMutation.mutate(booking.id_booking)
        }
    }

    const isPending = cancelBookingMutation.isPending

    return (
        <button 
            onClick={handleCancel}
            disabled={isPending}
            className={clsx(
                "flex items-center gap-1.5 px-4 py-1.5 text-red-600 font-medium text-xs",
                "rounded-lg border border-red-200 transition-colors shadow-sm bg-red-50",
                "hover:bg-red-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            )}
        >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            {isPending ? "Đang xử lý..." : "Hủy phòng"}
        </button>
    )
}
