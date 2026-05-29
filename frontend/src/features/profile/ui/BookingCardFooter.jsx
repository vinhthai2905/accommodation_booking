import BookingCancelButton from "../components/my-booking/BookingCancelButton"

import { formatCurrency } from "../../../helpers/booking/bookingHelpers"

import { BedDouble, ChevronRight, CreditCard, Wallet } from "lucide-react"
import { Link } from "react-router"

export default function BookingCardFooter({ booking, paymentLabel, invoice, payment, hotel, activeTab }) {
    return (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 text-xs text-slate-500">
                {payment?.payment_method && (
                    <span className="flex items-center gap-1">
                        <CreditCard size={13} className="text-blue-500" />
                        {paymentLabel[payment.payment_method] ?? payment.payment_method}
                    </span>
                )}
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

            <div className="flex items-center gap-3">
                {activeTab === 'upcoming' && <BookingCancelButton booking={booking} />}
                {hotel?.slug && hotel?.id_hotel && (
                    <Link
                        to={`/hotel/${hotel.slug}/${hotel.id_hotel}`}
                        className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        Xem khách sạn <ChevronRight size={14} />
                    </Link>
                )}
            </div>
        </div>
    )
}