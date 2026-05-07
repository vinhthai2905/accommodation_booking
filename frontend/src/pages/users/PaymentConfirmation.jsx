import PaymentConfirmationLoadingScreen from "../../features/book/components/Shared/LoadingFullScreen"

import BookHeader from "../../features/book/components/Shared/BookHeader"
import PaymentConfirmationDetails from "../../features/book/pages/PaymentConfirmationDetails"

import usePaymentConfirmation from "../../hooks/payment/usePaymentConfirmation"

export default function PaymentConfirmation() {
    const {
        isAuthenticated,
        isFetchingUser,
        isFetchingPayment,
    } = usePaymentConfirmation()

    if (isFetchingUser || isFetchingPayment)
        return <PaymentConfirmationLoadingScreen />

    return (
        <>
            <BookHeader isAuthenticated={isAuthenticated} />
            <PaymentConfirmationDetails />
        </>
    )
}