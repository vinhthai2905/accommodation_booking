import GuestDetailsFields from "./GuestDetailsFields"
import CheckoutRoomCard from "./CheckoutRoomCard"
import SpecialRequestFields from "./SpecialRequestFields"
import CheckinInfoFields from "./CheckinInfoFields"
import CheckoutAction from "./CheckoutAction"

import { clsx } from "clsx"
import { useForm, FormProvider } from "react-hook-form"

export default function CheckoutGuestForm() {
    const methods = useForm({
        mode: "onChange"
    })

    const onSuccessValidated = (data) => {
        console.log(data)
    }

    const onErrorValidated = () => {

    }

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
                        <CheckoutRoomCard />
                        <SpecialRequestFields />
                        <CheckinInfoFields />
                        <CheckoutAction />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}