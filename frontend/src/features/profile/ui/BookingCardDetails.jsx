import { formatDate } from "../../../helpers/booking/bookingHelpers"

import { CalendarDays, Clock, Users } from "lucide-react"

export default function BookingCardDetails({ booking, nights }) {
    return (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
                { icon: <CalendarDays size={14} />, label: "Nhận phòng", value: formatDate(booking.check_in_date) },
                { icon: <CalendarDays size={14} />, label: "Trả phòng", value: formatDate(booking.check_out_date) },
                { icon: <Clock size={14} />, label: "Lưu trú", value: `${nights} đêm` },
                {
                    icon: <Users size={14} />, label: "Khách",
                    value: `${booking.total_adults} NL${booking.total_children > 0 ? `, ${booking.total_children} TE` : ""}`
                },
            ].map(({ icon, label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                        {icon}{label}
                    </span>
                    <span className="text-sm font-semibold text-slate-800">{value}</span>
                </div>
            ))}
        </div>
    )
}