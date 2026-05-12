import LoadingHotelDatas from "../ui/dashboard-main/common/LoadingHotelDatas"
import ErrorLoadingHotelDatas from "../ui/dashboard-main/common/ErrorLoadingHotelDatas"

import DBRoomTypeHeader from "../components/dashboard-main/dashboard-room-type/DBRoomTypeHeader"
import DBRoomTypePagination from "../components/dashboard-main/dashboard-room-type/DBRoomTypePagination"
import DBRoomTypeTable from "../components/dashboard-main/dashboard-room-type/DBRoomTypeTable"
import DBRoomTypeToolBar from "../components/dashboard-main/dashboard-room-type/DBroomTypeToolBar"

import { clsx } from "clsx"
import { useState } from "react"
import { motion } from "framer-motion"

import usePartnerRoomTypes from "../../../hooks/dashboard/partner/usePartnerRoomTypes"

export default function DashboardRoomType() {
    const { data: roomTypes, isPending, isError, error } = usePartnerRoomTypes()
    const [searchTerm, setSearchTerm] = useState("")

    if (isPending)
        return <LoadingHotelDatas labelLoading={"Đang tải dữ liệu loại phòng..."} />


    if (isError) {
        return (
            <ErrorLoadingHotelDatas
                labelError={"Đã xảy ra lỗi."}
                errorMessage={error.message}
                alterMessageError={"Không thể tải danh sách loại phòng. Vui lòng thử lại sau."}
            />
        )
    }

    const filteredRooms = roomTypes?.filter(room =>
        room.type_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBRoomTypeHeader motion={motion} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                    "flex flex-1 min-h-0 w-full flex-col",
                    "overflow-hidden",
                    "rounded-xl border border-gray-200 bg-white shadow-sm"
                )}
            >
                <DBRoomTypeToolBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <DBRoomTypeTable filteredRooms={filteredRooms} />
                <DBRoomTypePagination filteredRooms={filteredRooms} />
            </motion.div>
        </div>
    )
}