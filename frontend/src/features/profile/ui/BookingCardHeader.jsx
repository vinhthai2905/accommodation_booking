import StatusBadge from "./StatusBadge"

import { MapPin } from "lucide-react"

export default function BookingCardHeader({ hotel, booking, orderStatus }) {
    return (
        <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                    Đặt phòng #{String(booking.id_booking).slice(0, 8).toUpperCase()}
                </p>
                <h3 className="text-base font-bold text-slate-900 truncate leading-tight">
                    {hotel?.name ?? "Khách sạn"}
                </h3>
                {hotel?.full_address && (
                    <p className="mt-1 text-xs text-slate-500 flex items-center gap-1 truncate">
                        <MapPin size={11} className="shrink-0 text-slate-400" />
                        {hotel.full_address}
                    </p>
                )}
            </div>
            <StatusBadge orderStatus={orderStatus} status={booking.status} />
        </div>
    )
}