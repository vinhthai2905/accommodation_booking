import BookHeader from "../features/book/components/BookHeader"
import LoadingScreen from "../components/ui/LoadingScreen"

import CheckoutSteps from "../features/book/section/CheckoutSteps"
import CheckoutSummary from "../features/book/pages/CheckoutSummary"

import { clsx } from "clsx"
import { useContext, useState } from "react"
import { AuthUserContext } from "../context/AuthUserContext"
import { Navigate } from "react-router"
import { motion } from "framer-motion"

import useBookingParams from "../hooks/booking/useBookingParams"
import useBookingSummary from "../hooks/booking/useBookingSummary"
import useCreateBooking from "../hooks/booking/useCreateBooking"
import PaymentCard from "../features/book/pages/PaymentCard"

export default function Book() {
    const { isAuthenticated, isFetchingUser } = useContext(AuthUserContext)
    const [stepCheckout, setStepCheckout] = useState(2)

    const hasAllBookingParams = useBookingParams()
    const { isLoading: isFetchingBookingSummary } = useBookingSummary(hasAllBookingParams)
    const { bookingFormPayload, handleBookingPayload, createBookingMutation } = useCreateBooking(setStepCheckout)


    if (!hasAllBookingParams)
        return <Navigate to="/index" replace />

    if (isFetchingUser || isFetchingBookingSummary)
        return <LoadingScreen />

    if (createBookingMutation.isPending)
        return <LoadingScreen />

    return (
        <>
            <BookHeader isAuthenticated={isAuthenticated} />
            <>
                <motion.main
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                >
                    <div className={clsx(
                        "flex flex-col gap-3 mt-5 xl:mx-[20%]",
                    )}>
                        <CheckoutSteps currentStep={stepCheckout} setStepCheckout={setStepCheckout} />
                        {stepCheckout === 2
                            ? <CheckoutSummary handleBookingPayload={handleBookingPayload} />
                            : <PaymentCard bookingFormPayload={bookingFormPayload} createBookingMutation={createBookingMutation} />
                        }
                    </div>
                </motion.main>
            </>
        </>
    )
}