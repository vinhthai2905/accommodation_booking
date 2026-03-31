import { clsx } from "clsx"

import BookingDetailsCard from "./BookingDetailsCard"
import HotelSummaryCard from "./HotelSummaryCard"
import PriceSummaryCard from "./PriceSummaryCard"
import CheckoutGuestForm from "./CheckoutGuestForm"

export default function CheckoutSummary() {
    return (
        <div className={clsx(
            "flex gap-3"
        )}>
            <aside className="flex flex-col w-[45%] gap-3">
                <HotelSummaryCard />
                <BookingDetailsCard />
                <PriceSummaryCard />
            </aside>
            <div className="w-[70%]">
                <CheckoutGuestForm />
            </div>
        </div>
    )
}