import BookingCardImage from "../../ui/user-booking/BookingCardImage"
import BookingCardHeader from "../../ui/user-booking/BookingCardHeader"
import BookingCardDetails from "../../ui/user-booking/BookingCardDetails"
import BookingCardFooter from "../../ui/user-booking/BookingCardFooter"

import { motion } from "framer-motion"
import { clsx } from "clsx"

import useBookingRefundPolicy from "../../../../hooks/profile/user-booking/useBookingRefundPolicy"
import useBookingReviews from "../../../../hooks/profile/user-booking/useBookingReviews"

import { orderStatus } from "../../helpers/orderStatus"
import { paymentLabel } from "../../helpers/paymentLabel"
import { paymentStatus } from "../../helpers/paymentStatus"
import { nightsBetween } from "../../../../helpers/booking/bookingHelpers"

export default function BookingCard({ booking, index, activeTab }) {
    const nights = nightsBetween(booking.check_in_date, booking.check_out_date)
    
    const { hotel, invoice } = booking
    const { refundPolicy, isFetchingRefundPolicy, isErrorFetchingHotelPolicy } = useBookingRefundPolicy(activeTab, hotel?.id_hotel)
    const { reviews, isFetchingReviews, isErrorFetchingReview } = useBookingReviews(activeTab, hotel?.id_hotel)

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className={clsx(
                "group bg-white rounded-2xl border border-gray-200 overflow-hidden",
                "shadow-sm hover:shadow-md transition-shadow duration-300",
            )}
        >
            <div className="flex">
                <BookingCardImage hotel={hotel} />

                <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                    <BookingCardHeader
                        booking={booking}
                        hotel={hotel}
                        orderStatus={orderStatus}
                        payment={booking.payment}
                        paymentStatus={paymentStatus}
                        paymentLabel={paymentLabel}
                    />
                    <BookingCardDetails 
                        booking={booking} 
                        nights={nights} 
                    />
                    <BookingCardFooter
                        paymentLabel={paymentLabel}
                        activeTab={activeTab}
                        booking={booking}
                        hotel={hotel}
                        invoice={invoice}
                        payment={booking.payment}
                        isFetchingReviews={isFetchingReviews}
                        reviews={reviews}
                        isFetchingRefundPolicy={isFetchingRefundPolicy}
                        refundPolicy={refundPolicy}
                    />
                </div>
            </div>
        </motion.div>
    )
}