import { clsx } from "clsx"
import { ArrowRight, Loader2 } from "lucide-react"

export default function PaymentButton({ method, bookingFormPayload, handleConfirmBooking, createBookingMutation }) {
    return (
        <button
            type="button"
            onClick={handleConfirmBooking}
            disabled={createBookingMutation?.isPending || !bookingFormPayload}
            style={{ backgroundColor: method.color }}
            className={clsx(
                "mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3",
                "text-sm font-semibold text-white transition-all",
                "hover:opacity-90 active:scale-[0.98]",
                "disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer",
            )}
        >
            {createBookingMutation?.isPending
                ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Đang xử lý…
                    </>
                )
                : (
                    <>
                        Xác nhận thanh toán <ArrowRight className="h-4 w-4" />
                    </>
                )}
        </button>
    )
}