import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"

import { createBooking } from "../../services/bookingServices"

export default function useCreateBooking() {
    return useMutation({
        mutationKey: ["createBooking"],
        mutationFn: createBooking,

        onSuccess: () => {
            toast.success("Booking created successfully.")
        },

        onError: () => {
            toast.error("Create booking failed.")
        },
    })
}