import { useForm } from "react-hook-form"

export default function useFormBooking(buildPayload, createBookingMutation) {
    const methods = useForm()

    const onSuccessValidated = (submitData) => {
        const bookingPayload = buildPayload(submitData)
        createBookingMutation.mutate(bookingPayload)
    }

    const onErrorValidated = () => {

    }

    return {
        methods,
        onSuccessValidated,
        onErrorValidated
    }
}