import PaymentConfirmationLoadingScreen from "../../features/book/components/Shared/LoadingFullScreen"
import BookHeader from "../../features/book/components/Shared/BookHeader"
import PaymentConfirmationDetails from "../../features/book/pages/PaymentConfirmationDetails"

import { useContext } from "react"
import { Navigate } from "react-router"

import usePaymentConfirmation from "../../hooks/payment/usePaymentConfirmation"

import { AuthUserContext } from "../../context/authentication/AuthUserContext"

export default function PaymentConfirmation() {
    const { user } = useContext(AuthUserContext)

    const {
        isAuthenticated,
        isFetchingUser,
        isFetchingPayment,
        booking
    } = usePaymentConfirmation()

    if (!user)
        return <Navigate to="/index" replace/>

    if (isFetchingUser || isFetchingPayment)
        return <PaymentConfirmationLoadingScreen />

    return (
        <>
            <BookHeader isAuthenticated={isAuthenticated} />
            <PaymentConfirmationDetails booking={booking} />
        </>
    )
}