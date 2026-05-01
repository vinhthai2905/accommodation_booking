import { clsx } from "clsx"

import BookingDetailsCard from "../components/BookingDetailsCard"
import HotelSummaryCard from "../components/HotelSummaryCard"
import PriceSummaryCard from "../components/PriceSummaryCard"
import CheckoutGuestForm from "../components/CheckoutGuestForm"

export default function CheckoutSummary() {
    return (
        <div className={clsx(
            "flex gap-3"
        )}>
            <aside className="flex flex-col w-[35%] gap-3">
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