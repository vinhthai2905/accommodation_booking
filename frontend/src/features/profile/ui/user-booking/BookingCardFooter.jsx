import BookingCancelButton from "../../components/user-booking/BookingCancelButton"

import { formatCurrency } from "../../../../helpers/booking/bookingHelpers"

import { BedDouble, ChevronRight, CreditCard, Wallet } from "lucide-react"
import { Link } from "react-router"
import BookingReviewStatus from "./BookingReviewStatus"

export default function BookingCardFooter({
    paymentLabel,
    activeTab,
    booking,
    hotel,
    invoice,
    payment,
    isFetchingReviews,
    reviews,
    isFetchingRefundPolicy,
    refundPolicy
}) {
    const isCheckoutBooking = ['CONFIRMED', 'COMPLETED'].includes(booking?.status)

    return (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
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

                {/* Displaying Refund Policy in Footer
                {activeTab === 'upcoming' && (
                    <span className="flex items-center gap-1">
                        {isFetchingRefundPolicy ? (
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        ) : (
                            <span className="font-semibold text-orange-600">
                                {refundPolicy ?
                                    (refundPolicy.is_cancellation_allowed
                                        ? `Hoàn tiền ${refundPolicy.penalty_percentage}% (hủy trước ${refundPolicy.days_before_arrival_penalty} ngày)`
                                        : 'Không hoàn tiền')
                                    : 'Chính sách: Không rõ'}
                            </span>
                        )}
                    </span>
                )} */}
            </div>

            <div className="flex items-center gap-3">
                {activeTab === 'upcoming' && booking.status === 'PENDING' && !isFetchingRefundPolicy
                    && <BookingCancelButton
                        booking={booking}
                        refundPolicy={refundPolicy}
                        isFetchingRefundPolicy={isFetchingRefundPolicy}
                    />
                }

                {isCheckoutBooking && !isFetchingReviews (
                    <BookingReviewStatus
                        booking={booking}
                        hotel={hotel}
                        reviews={reviews}
                        isFetchingReviews={isFetchingReviews}
                    />
                )}
            </div>
        </div>
    )
}