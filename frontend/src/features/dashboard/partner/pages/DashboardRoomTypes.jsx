import LoadingRoomTypes from "../../ui/loading/LoadingHotelDatas"
import ErrorLoadingRoomTypes from "../../ui/loading/ErrorLoadingHotelDatas"

import DBRoomTypeHeader from "../components/dashboard-main/dashboard-room-type/list-page/section/DBRoomTypeHeader"
import DBRoomTypePagination from "../components/dashboard-main/dashboard-room-type/list-page/section/DBRoomTypePagination"
import DBRoomTypeTable from "../components/dashboard-main/dashboard-room-type/list-page/section/DBRoomTypeTable"
import DBRoomTypeToolBar from "../components/dashboard-main/dashboard-room-type/list-page/section/DBroomTypeToolBar"

import { clsx } from "clsx"
import { useState } from "react"
import { motion } from "framer-motion"

import usePartnerRoomTypes from "../../../../hooks/dashboard/partner/room-type-hooks/services/usePartnerRoomTypes"

export default function DashboardRoomTypes() {
    const { data: roomTypes, isPending, isError, error } = usePartnerRoomTypes()
    const [searchTerm, setSearchTerm] = useState("")

    if (isPending)
        return <LoadingRoomTypes labelLoading={"Đang tải dữ liệu loại phòng..."} />


    if (isError) {
        return (
            <ErrorLoadingRoomTypes
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