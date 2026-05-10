import { useForm } from "react-hook-form"

export default function useFormBooking(buildPayload, handleBookingPayload) {
    const methods = useForm()

    const onSuccessValidated = (submitData) => {
        const bookingPayload = buildPayload(submitData)
        handleBookingPayload(bookingPayload)
    }

    const onErrorValidated = () => {

    }

    return {
        methods,
        onSuccessValidated,
        onErrorValidated
    }
}