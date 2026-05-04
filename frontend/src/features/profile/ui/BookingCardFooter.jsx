import { formatCurrency } from "../utils/bookingUtils"

import { BedDouble, ChevronRight, CreditCard, Wallet } from "lucide-react"
import { Link } from "lucide-react"

export default function BookingCardFooter({ booking, paymentLabel, invoice, hotel }) {
    return (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                    <CreditCard size={13} className="text-blue-500" />
                    {paymentLabel[booking.payment_method] ?? booking.payment_method}
                </span>
                <span className="flex items-center gap-1">
                    <BedDouble size={13} className="text-blue-500" />
                    {booking.total_room_quantity} phòng
                </span>
                {invoice?.total_amount != null && (
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Wallet size={13} className="text-blue-500" />
                        {formatCurrency(invoice.total_amount)}
                    </span>
                )}
            </div>

            {hotel?.slug && hotel?.id_hotel && (
                <Link
                    to={`/hotel/${hotel.slug}/${hotel.id_hotel}`}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                    Xem khách sạn <ChevronRight size={14} />
                </Link>
            )}
        </div>
    )
}