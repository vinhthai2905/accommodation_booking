import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "react-hot-toast"

import { createBooking } from "../../services/book/bookingServices"
import useHandleDoubleBooking from "./useHandleDoubleBooking"

export default function useCreateBooking(setStepCheckout) {
    const { handleDoubleBookingError } = useHandleDoubleBooking()
    const [bookingFormPayload, setBookingFormPayload] = useState(null)

    const createBookingMutation = useMutation({
        mutationKey: ["createBooking"],
        mutationFn: createBooking,

        onSuccess: (data) => {
            const redirectPaymentGateway = data.payment_gateway_result.order_url
            if (redirectPaymentGateway) {
                window.location.href = redirectPaymentGateway
            }
        },

        onError: (err) => {
            const errorData = err.response?.data
            console.error(errorData)
            
            const errorMessage = JSON.stringify(errorData)
            
            if (errorMessage.includes("already booked for the specified dates.")) {
                let bookedRoomIds = []
                if (errorData && errorData.booked_room_ids) {
                    bookedRoomIds = errorData.booked_room_ids
                } else if (Array.isArray(errorData) && errorData[0]?.booked_room_ids) {
                    bookedRoomIds = errorData[0].booked_room_ids
                }
                
                handleDoubleBookingError(bookedRoomIds, bookingFormPayload)
            } else {
                toast.error("Lỗi đặt phòng: " + errorMessage)
            }
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