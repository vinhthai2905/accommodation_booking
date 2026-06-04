import { clsx } from "clsx"
import { Loader2, Timer } from "lucide-react"

import useUserBookingMutation from "../../../../hooks/profile/user-booking/useUserBookingMutation"
import { useFreeCancellationTimeout } from "../../../../hooks/profile/user-booking/useFreeCancellationTimeout"
import { checkIsExpiration } from "../../helpers/getRemainingMinutes"

export default function BookingCancelButton({ booking, refundPolicy }) {
    const {
        freeCancellationTimeout,
        setFreeCancellationTimeout,
        freeCancellationExpiresAt
    } = useFreeCancellationTimeout(booking, refundPolicy)
    const { handleCancelBooking, cancelBookingMutation } = useUserBookingMutation(refundPolicy, freeCancellationExpiresAt)


    const isFreeCancellationTimout = freeCancellationTimeout !== null && freeCancellationTimeout !== 0

    return (
        <button
            onClick={() => handleCancelBooking(booking)}
            disabled={cancelBookingMutation.isPending || freeCancellationTimeout === null}
            title={freeCancellationTimeout !== 0 ? "Bạn sẽ không bị mất phí nếu hủy trong thời gian này" : "Đã hết thời gian hủy miễn phí"}
            className={clsx(
                "flex items-center gap-1.5 px-4 py-2 text-red-600 font-medium text-xs",
                "rounded-lg border border-red-200 transition-all duration-300 shadow-sm bg-red-50",
                "hover:bg-red-100 hover:shadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            )}
        >
            {cancelBookingMutation.isPending && <Loader2 size={14} className="animate-spin" />}
            {cancelBookingMutation.isPending ? (
                "Đang xử lý..."
            ) : (
                <>
                    {isFreeCancellationTimout ? 'Hủy miễn phí' : 'Hủy phòng'}
                    {isFreeCancellationTimout && (
                        <span className="flex items-center gap-1 font-semibold bg-red-100/80 px-1.5 py-0.5 rounded-md text-red-700 ml-0.5 border border-red-200/50">
                            <Timer size={13} className="animate-pulse" />
                            {freeCancellationTimeout}
                        </span>
                    )}
                </>
            )}
        </button>
    )
}
