import { clsx } from "clsx"

import GuestDetailsForm from "./GuestDetailsForm"
import CheckoutRoomCard from "./CheckoutRoomCard"
import SpecialRequestForm from "./SpecialRequestForm"
import CheckinInfoForm from "./CheckinInfoForm"
import CheckoutAction from "./CheckoutAction"

export default function CheckoutGuestForm() {
    return (
        <div className={clsx(
            "rounded-2xl bg-white",
            "flex flex-col gap-3",
            "text-black text-sm"
        )}>
            <GuestDetailsForm />
            <CheckoutRoomCard />
            <SpecialRequestForm />
            <CheckinInfoForm />
            <CheckoutAction />
        </ div>
    )
}