import BookingDetailsCard from "./BookingDetailsCard"
import HotelSummaryCard from "./HotelSummaryCard"
import PriceSummaryCard from "./PriceSummaryCard"

export default function CheckoutSummary() {
    return (
        <>
            <aside className="flex flex-col">
                <HotelSummaryCard />
                <BookingDetailsCard />
                <PriceSummaryCard />
            </aside>
            <div>

            </div>
        </>
    )
}