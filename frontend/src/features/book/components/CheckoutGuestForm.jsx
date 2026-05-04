import GuestDetailsFields from "./GuestDetailsFields"
import SpecialRequestFields from "./SpecialRequestFields"
import CheckinInfoFields from "./CheckinInfoFields"
import CheckoutAction from "./CheckoutAction"

import { clsx } from "clsx"
import { FormProvider } from "react-hook-form"

import useFormBooking from "../../../hooks/booking/useFormBooking"
import useBookingPayload from "../../../hooks/booking/useBookingPayLoad"

export default function CheckoutGuestForm({ handleBookingPayload }) {
    const buildBookingPayload = useBookingPayload()
    const { methods, onSuccessValidated, onErrorValidated } = (
        useFormBooking(buildBookingPayload, handleBookingPayload)
    )

    return (
        <div className={clsx(
            "rounded-2xl bg-white",
            "text-black text-sm"
        )}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSuccessValidated, onErrorValidated)}>
                    <div className={clsx(
                        "flex flex-col gap-3"
                    )}>
                        <GuestDetailsFields />
                        <SpecialRequestFields />
                        <CheckinInfoFields />
                        <CheckoutAction />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}