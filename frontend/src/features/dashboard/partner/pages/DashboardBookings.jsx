import LoadingBookings from "../../ui/loading/LoadingHotelDatas"
import ErrorLoadingBookings from "../../ui/loading/ErrorLoadingHotelDatas"

import DBBookingHeader from "../../ui/dashboard-main/list-page/DBListHeader"
import DBBookingToolBar from "../components/dashboard-main/dashboard-booking/list-page/section/DBBookingToolBar"
import DBBookingTable from "../components/dashboard-main/dashboard-booking/list-page/section/DBBookingTable"
import DBBookingPagination from "../components/dashboard-main/dashboard-booking/list-page/section/DBBookingPagination"

import { useState } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "react-router"

import { usePartnerBookings } from "../../../../hooks/dashboard/partner/booking-hooks/services/usePartnerBookings"

export default function DashboardBookings() {
    const [searchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState("")

    const {
        data: bookings,
        isPending: isPendingBookings,
        isError,
        error: errorBookings
    } = usePartnerBookings(searchParams.get("tab"))


    if (isPendingBookings)
        return <LoadingBookings labelLoading="Đang tải danh sách đặt phòng..." />



    if (isError)
        return <ErrorLoadingBookings
            errorMessage={errorBookings.message}
            alterMessageError={"Không thể tải danh sách đặt phòng. Vui lòng thử lại sau"}
        />

    return (
        <main className="flex h-full flex-col gap-6 p-6 bg-gray-50/50">
            <DBBookingHeader
                
                listLabel={"Danh sách đặt phòng"}
                instructionLabel={"Quản lý các đơn đặt phòng của khách hàng tại đây."}
            />

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
                <DBBookingToolBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <DBBookingTable bookings={bookings} />

                <DBBookingPagination bookings={bookings} />
            </motion.section>
        </main>
    )
}