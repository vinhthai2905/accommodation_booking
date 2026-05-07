import { useSearchParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"

import { AuthUserContext } from "../../context/AuthUserContext"

import { fetchBookingConfirmation } from "../../services/bookingServices"

export default function usePaymentConfirmation() {
    const { isAuthenticated, isFetchingUser, user } = useContext(AuthUserContext)
    const [searchParams] = useSearchParams()
    const bookingID = searchParams.get("id_booking")

    const { isLoading, isSuccess, data, isError, error } = useQuery({
        queryKey: ["fetchBookingConfirmation", user?.email, bookingID],
        queryFn: () => fetchBookingConfirmation(bookingID),
        enabled: !!user && !!bookingID
    })
    const booking = isSuccess ? data?.booking_details : {}

    return {
        isAuthenticated,
        isFetchingUser,
        isFetchingPayment: isLoading,
        isFetchPaymentError: isError,
        paymentFetchError: error,
        booking,
    }

}