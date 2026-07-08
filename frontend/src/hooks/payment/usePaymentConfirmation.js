import { useSearchParams } from "react-router"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useContext, useEffect } from "react"

import { AuthUserContext } from "../../context/authentication/AuthUserContext"

import { fetchBookingConfirmation } from "../../services/book/bookingServices"

export default function usePaymentConfirmation() {
    const { isAuthenticated, isFetchingUser, user } = useContext(AuthUserContext)
    const [searchParams] = useSearchParams()
    const bookingID = searchParams.get("id_booking")

    const { isLoading, isSuccess, data, isError, error } = useQuery({
        queryKey: ["fetchBookingConfirmation", user?.email, bookingID],
        queryFn: () => fetchBookingConfirmation(bookingID),
        enabled: !!user && !!bookingID,
        staleTime: Infinity
    })

    const booking = isSuccess ? data?.booking_details : null

    return {
        isAuthenticated,
        isFetchingUser,
        isFetchingPayment: isLoading,
        isFetchPaymentError: isError,
        paymentFetchError: error,
        booking,
    }

}