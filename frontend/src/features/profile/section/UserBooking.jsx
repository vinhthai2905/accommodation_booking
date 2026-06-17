import BookingList from "../components/user-booking/BookingList"
import BookingEmptyList from "../components/user-booking/BookingEmptyList"
import BookingTabs from "../components/user-booking/BookingTabs"
import BookingCardSkeleton from "../components/user-booking/BookingCardSkeleton"
import BookingErrorState from "../components/user-booking/BookingErrorState"

import { useState } from "react"
import { useSearchParams } from "react-router"
import { motion, AnimatePresence } from "framer-motion"

import { useTabTitle } from "../../../hooks/common/useTabTitle"
import useUserBookings from "../../../hooks/profile/user-booking/useUserBookings"
import { useAuthUserContext } from "../../../hooks/authentication/common/useAuthUserContext"

import { tabs } from "../helpers/orderStatus"
import { emptyContentTabs } from "../helpers/emptyContentTabs"

export default function UserBooking() {
    useTabTitle("Booking.com | Chuyến đi của tôi")

    const [searchParams, setSearchParams] = useSearchParams()
    const { isAuthenticated } = useAuthUserContext()

    const [activeTab, setActiveTab] = useState(searchParams.get("tab"))
    const { 
        bookings, 
        isPending: isFetchingBookings, 
        isError: isErrorBookings 
    } = useUserBookings(activeTab, isAuthenticated)


    const emptyContentCurrentTab = emptyContentTabs[activeTab]

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-10">

                <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Đặt chỗ &amp; Chuyến đi</h1>
                    <p className="text-sm text-slate-500 mt-1">Quản lý tất cả các đặt phòng của bạn ở đây.</p>
                </motion.div>

                <BookingTabs
                    isFetchingBookings={isFetchingBookings}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={tabs}
                    bookings={bookings}
                    setSearchParams={setSearchParams}
                />

                <AnimatePresence mode="wait">
                    {isFetchingBookings
                        ? <BookingCardSkeleton />
                        : isErrorBookings
                            ? <BookingErrorState />
                            : (
                                bookings.length === 0
                                    ? <BookingEmptyList
                                        activeTab={activeTab}
                                        emptyContentCurrentTab={emptyContentCurrentTab}
                                    />
                                    : (
                                        <BookingList
                                            filteredBooking={bookings}
                                            activeTab={activeTab}
                                        />
                                    )
                            )
                    }
                </AnimatePresence>

            </div>
        </div>
    )
}