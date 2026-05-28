import BookingCardImage from "../ui/BookingCardImage"
import BookingCardHeader from "../ui/BookingCardHeader"
import BookingCardDetails from "../ui/BookingCardDetails"
import BookingCardFooter from "../ui/BookingCardFooter"

import { motion } from "framer-motion"
import { clsx } from "clsx"

import { orderStatus } from "../helpers/orderStatus"
import { paymentLabel } from "../helpers/paymentLabel"
import { paymentStatus } from "../helpers/paymentStatus"
import { nightsBetween } from "../../../helpers/booking/bookingHelpers"

export default function BookingCard({ booking, index, activeTab }) {
    const { hotel, invoice } = booking

    const nights = nightsBetween(booking.check_in_date, booking.check_out_date)

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
                    <BookingCardDetails booking={booking} nights={nights} />
                    <BookingCardFooter
                        booking={booking}
                        paymentLabel={paymentLabel}
                        invoice={invoice}
                        payment={booking.payment}
                        hotel={hotel}
                        activeTab={activeTab}
                    />
                </div>
            </div>
        </motion.div>
    )
}