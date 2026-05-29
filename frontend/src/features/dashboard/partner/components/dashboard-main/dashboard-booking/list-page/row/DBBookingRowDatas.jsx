import { clsx } from "clsx"
import { CalendarCheck, User } from "lucide-react"

export default function DBBookingRowDatas({ booking }) {
    const bookingId = booking.id_booking
    const userEmail = booking.booking_user.email

    const totalPrice = booking.total_price || booking.total_amount || booking.invoice?.total_amount || 0
    const paymentStatusRaw = booking.payment?.status || booking.payment_status || booking.invoice?.status || "PENDING"
    const isPaid = paymentStatusRaw?.toUpperCase() === "PAID"
    const paymentStatusDisplay = isPaid ? "Đã thanh toán" : "Chưa thanh toán"

    const statusRaw = booking.status || "PENDING"
    let statusDisplay = "Chờ nhận phòng"
    let statusColor = "bg-blue-50 text-blue-700 border border-blue-200/80"

    switch (statusRaw.toUpperCase()) {
        case "CONFIRMED":
            statusDisplay = "Đã nhận phòng"
            statusColor = "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
            break
        case "COMPLETED":
            statusDisplay = "Đã trả phòng"
            statusColor = "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
            break
        case "CANCELLED":
            statusDisplay = "Đã hủy"
            statusColor = "bg-rose-50 text-rose-700 border border-rose-200/80"
            break
        case "PENDING":
        default:
            statusDisplay = "Chờ nhận phòng"
            statusColor = "bg-amber-50 text-amber-700 border border-amber-200/80"
            break
    }

    return (
        <>
            <td className="p-4">
                <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
            </td>

            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className={clsx(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        "bg-linear-to-tr from-gray-50 to-gray-100 border border-gray-200/80",
                        "text-gray-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200"
                    )}>
                        <CalendarCheck size={20} />
                    </div>

                    <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            Booking #{bookingId}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5 font-medium">
                            ID: {bookingId}
                        </p>
                    </div>
                </div>
            </td>

            <td className="p-4 text-left">
                <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="font-medium text-gray-700">{userEmail}</span>
                </div>
            </td>

            <td className="p-4 text-gray-600 font-medium whitespace-nowrap">
                {booking.check_in_date}
            </td>

            <td className="p-4 text-gray-600 font-medium whitespace-nowrap">
                {booking.check_out_date}
            </td>

            <td className="p-4 text-gray-900 font-semibold tracking-tight">
                {parseInt(totalPrice).toLocaleString("vi-VN")} đ
            </td>

            <td className="p-4">
                <span className={clsx(
                    "inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase shadow-sm",
                    isPaid
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                        : "bg-amber-50 text-amber-700 border border-amber-200/80"
                )}>
                    {paymentStatusDisplay}
                </span>
            </td>

            <td className="p-4">
                <span className={clsx(
                    "inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase shadow-sm",
                    statusColor
                )}>
                    {statusDisplay}
                </span>
            </td>
        </>
    )
}