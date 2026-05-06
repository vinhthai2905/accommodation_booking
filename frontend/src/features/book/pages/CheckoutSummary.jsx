import BookingDetailsCard from "../components/CheckoutSummary/BookingDetailsCard"
import HotelSummaryCard from "../components/CheckoutSummary/HotelSummaryCard"
import PriceSummaryCard from "../components/CheckoutSummary/PriceSummaryCard"
import CheckoutGuestForm from "../components/CheckoutSummary/CheckoutGuestForm"

import AuthenticatedCard from "../components/Shared/AuthenticatedCard"

import { clsx } from "clsx"
import { useContext } from "react"
import { useSearchParams } from "react-router"

import { AuthUserContext } from "../../../context/AuthUserContext"
import { BookingContext } from "../../../context/BookingContext"

export default function CheckoutSummary({ handleBookingPayload }) {
    const { isAuthenticated } = useContext(AuthUserContext)
    const { selectedRooms, totalPrice } = useContext(BookingContext)
    const [searchParams] = useSearchParams()

    return (
        <div className={clsx(
            "flex gap-3"
        )}>
            <aside className="flex flex-col w-[35%] gap-3">
                <HotelSummaryCard />
                <BookingDetailsCard
                    selectedRooms={selectedRooms}
                    checkInDate={searchParams.get("check_in")}
                    checkOutDate={searchParams.get("check_out")}
                />
                <PriceSummaryCard totalRoomPrice={totalPrice} />
            </aside>
            <div className="flex flex-col w-[70%] gap-3">
                {isAuthenticated ? <AuthenticatedCard /> : undefined}
                <CheckoutGuestForm handleBookingPayload={handleBookingPayload} />
            </div>
        </div>
    )
}