import { clsx } from "clsx"
import { ClipboardList, CheckCircle, XCircle } from "lucide-react"
import { useNavigate } from "react-router"

export default function DBBookingRowActions({ booking, setIsMenuOpen }) {
    const navigate = useNavigate()
    const bookingId = booking.id_booking || booking.id_dat_phong

    return (
        <div className={clsx(
            "absolute right-12 top-4 z-50 w-44 rounded-xl bg-white p-1.5",
            "shadow-[0_12px_30px_-10px_rgba(0,0,0,0.2)] border border-gray-100/80 ring-1 ring-black/5",
            "transition-all duration-150 origin-top-right text-left"
        )}>
            <button
                onClick={() => {
                    setIsMenuOpen(false)
                    navigate(`/partner/dashboard/hotel/bookings/${bookingId}/details`)
                }}
                className={clsx(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700",
                    "hover:bg-violet-50 hover:text-violet-600 transition-all duration-150 cursor-pointer group/btn"
                )}
            >
                <ClipboardList size={15} className="text-gray-400 group-hover/btn:text-violet-600 transition-colors" />
                <span>Chi tiết</span>
            </button>

            <div className="my-1 h-px bg-gray-50" />

            <button
                onClick={() => {
                    setIsMenuOpen(false)
                }}
                className={clsx(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-emerald-600",
                    "hover:bg-emerald-50 transition-all duration-150 cursor-pointer group/btn"
                )}
            >
                <CheckCircle size={15} className="text-emerald-400 group-hover/btn:text-emerald-600 transition-colors" />
                <span>Xác nhận</span>
            </button>

            <div className="my-1 h-px bg-gray-50" />

            <button
                onClick={() => {
                    setIsMenuOpen(false)
                }}
                className={clsx(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600",
                    "hover:bg-rose-50 transition-all duration-150 cursor-pointer group/btn"
                )}
            >
                <XCircle size={15} className="text-rose-400 group-hover/btn:text-rose-600 transition-colors" />
                <span>Hủy đặt phòng</span>
            </button>
        </div>
    )
}