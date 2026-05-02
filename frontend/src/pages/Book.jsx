import BookHeader from "../features/book/components/BookHeader"
import CheckoutProcess from "../features/book/pages/CheckoutProcess"
import LoadingScreen from "../components/ui/LoadingScreen"

import { useContext } from "react"
import { AuthUserContext } from "../context/AuthUserContext"
import { useSearchParams, Navigate } from "react-router"
import { getBookingParams } from "../helpers/getBookingParams"

import useBookingSummary from "../hooks/booking/useBookingSummary"

export default function Book() {
    const [searchParams, setSearchParams] = useSearchParams()
    const finalizeParams = getBookingParams(searchParams)
    const hasAllBookingParams = Object.values(finalizeParams).every(value => Boolean(value))

    const { isAuthenticated, isFetchingUser } = useContext(AuthUserContext)
    const { isLoading: isFetchingBookingSummary } = useBookingSummary(hasAllBookingParams)

    if (!hasAllBookingParams)
        return <Navigate to="/index" replace/>

    if (isFetchingUser || isFetchingBookingSummary)
        return <LoadingScreen />

    return (
        <>
            <BookHeader isAuthenticated={isAuthenticated} />
            <CheckoutProcess />
        </>
    )
}