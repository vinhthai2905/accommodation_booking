import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "react-hot-toast"

import { createBooking } from "../../services/bookingServices"

export default function useCreateBooking(setStepCheckout) {
    const [bookingFormPayload, setBookingFormPayload] = useState(null)
    const createBookingMutation = useMutation({
        mutationKey: ["createBooking"],
        mutationFn: createBooking,

        onSuccess: () => {
            toast.success("Booking created successfully.")
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