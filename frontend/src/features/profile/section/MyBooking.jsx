import BookingList from "../components/BookingList"
import BookingEmptyList from "../components/BookingEmptyList"
import BookingTabs from "../components/BookingTabs"
import BookingCardSkeleton from "../components/BookingCardSkeleton"
import BookingErrorState from "../components/BookingErrorState"

import { tabs } from "../helpers/orderStatus"
import { emptyContentTabs } from "../helpers/emptyContentTabs"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import useUserBookings from "../../../hooks/profile/useUserBookings"

export default function MyBooking() {
    const [activeTab, setActiveTab] = useState("upcoming")
    const { bookings, isLoading: isFetchingBookings, isError } = useUserBookings(activeTab)

    const emptyContentCurrentTab = emptyContentTabs[activeTab]

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-10">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Đặt chỗ &amp; Chuyến đi</h1>
                    <p className="text-sm text-slate-500 mt-1">Quản lý tất cả các đặt phòng của bạn ở đây.</p>
                </motion.div>

                {/* Tabs */}
                <BookingTabs
                    isFetchingBookings={isFetchingBookings}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={tabs}
                    bookings={bookings}
                />

                {/* Content */}
                <AnimatePresence mode="wait">
                    {isFetchingBookings
                        ? <BookingCardSkeleton  />
                        : isError
                            ? <BookingErrorState  />
                            : (
                                bookings.length === 0
                                ? <BookingEmptyList
                                    
                                    activeTab={activeTab}
                                    emptyContentCurrentTab={emptyContentCurrentTab}
                                />
                                : (
                                    <BookingList
                                        filteredBooking={bookings}
                                        
                                    />
                                )
                            )
                    }
                </AnimatePresence>

            </div>
        </div>
    )
}