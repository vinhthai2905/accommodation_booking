import { clsx } from "clsx"
import { Loader2 } from "lucide-react"

import useUserBookingMutation from "../../../../hooks/profile/user-booking/useUserBookingMutation"
import { useFreeCancellationTimeout } from "../../../../hooks/profile/user-booking/useFreeCancellationTimeout"

export default function BookingCancelButton({ booking, refundPolicy, isFetchingRefundPolicy }) {
    const { handleCancelBooking, cancelBookingMutation } = useUserBookingMutation()
    const { freeCancellationTimeout } = useFreeCancellationTimeout(booking, refundPolicy)

    return (
        <button
            onClick={() => handleCancelBooking(booking)}
            disabled={cancelBookingMutation.isPending}
            className={clsx(
                "flex items-center gap-1.5 px-4 py-1.5 text-red-600 font-medium text-xs",
                "rounded-lg border border-red-200 transition-colors shadow-sm bg-red-50",
                "hover:bg-red-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            )}
        >
            {cancelBookingMutation.isPending && <Loader2 size={14} className="animate-spin" />}
            {cancelBookingMutation.isPending ? (
                "Đang xử lý..."
            ) : (
                <>
                    Hủy phòng
                    {freeCancellationTimeout !== 0 && (
                        <span className="font-normal opacity-90">({freeCancellationTimeout}p)</span>
                    )}
                </>
            )}
        </button>
    )
}
