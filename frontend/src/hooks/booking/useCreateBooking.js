import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "react-hot-toast"

import { createBooking } from "../../services/book/bookingServices"

export default function useCreateBooking(setStepCheckout) {
    const [bookingFormPayload, setBookingFormPayload] = useState(null)
    const createBookingMutation = useMutation({
        mutationKey: ["createBooking"],
        mutationFn: createBooking,

        onSuccess: (data) => {
            const redirectPaymentGateway = (
                data.payment_gateway_result.order_url
            )
            if (redirectPaymentGateway)
                window.location.href = redirectPaymentGateway
        },

        onError: () => {
            toast.error("Create booking failed.")
        },
    })

    const handleBookingPayload = (payload) => {
        setBookingFormPayload(payload)
        setStepCheckout(3)
    }

    return {
        bookingFormPayload,
        handleBookingPayload,
        createBookingMutation
    }
}