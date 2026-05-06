import LoadingFullScreen from "../features/book/components/Shared/BookingSummaryLoadingScreen"

import BookHeader from "../features/book/components/Shared/BookHeader"
import PaymentConfirmationDetails from "../features/book/pages/PaymentConfirmationDetails"

import { useContext } from "react"
import { AuthUserContext } from "../context/AuthUserContext"

export default function PaymentConfirmation() {
    const {isAuthenticated, isFetchingUser} = useContext(AuthUserContext)

    if (isFetchingUser) 
        return <LoadingFullScreen />

    return (
        <>
            <BookHeader isAuthenticated={isAuthenticated}/>
            <PaymentConfirmationDetails />
        </>
    )
}