import BookingDetailsCard from "../components/BookingDetailsCard"
import HotelSummaryCard from "../components/HotelSummaryCard"
import PriceSummaryCard from "../components/PriceSummaryCard"
import CheckoutGuestForm from "../components/CheckoutGuestForm"
import AuthenticatedCard from "../components/AuthenticatedCard"

import { clsx } from "clsx"
import { useContext } from "react"
import { useSearchParams } from "react-router"

import { AuthUserContext } from "../../../context/AuthUserContext"
import { BookingContext } from "../../../context/BookingContext"

import useBookingSummary from "../../../hooks/booking/useBookingSummary"

export default function CheckoutSummary() {
    const { isAuthenticated } = useContext(AuthUserContext)
    const { selectedRooms, totalPrice } = useContext(BookingContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const { data: hotelSummary } = useBookingSummary()

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
                <CheckoutGuestForm />
            </div>
        </div>
    )
}