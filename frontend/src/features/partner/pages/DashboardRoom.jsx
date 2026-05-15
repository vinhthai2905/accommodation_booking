import LoadingHotelDatas from "../ui/dashboard-main/common/LoadingHotelDatas"
import ErrorLoadingHotelDatas from "../ui/dashboard-main/common/ErrorLoadingHotelDatas"

import DBRoomHeader from "../components/dashboard-main/dashboard-room/list-page/section/DBRoomHeader"
import DBRoomPagination from "../components/dashboard-main/dashboard-room/list-page/section/DBRoomPagination"
import DBRoomTable from "../components/dashboard-main/dashboard-room/list-page/section/DBRoomTable"
import DBRoomToolBar from "../components/dashboard-main/dashboard-room/list-page/section/DBRoomToolBar"

import { clsx } from "clsx"
import { useState } from "react"
import { motion } from "framer-motion"
import { useParams } from "react-router"

import usePartnerRooms from "../../../hooks/dashboard/partner/room-type-hooks/services/usePartnerRooms"

export default function DashboardRoom() {
    const { id_room_type } = useParams()
    const { data: rooms, isPending, isError, error } = usePartnerRooms(id_room_type, true)
    const [searchTerm, setSearchTerm] = useState("")

    if (isPending)
        return <LoadingHotelDatas labelLoading={"Đang tải dữ liệu phòng vật lý..."} />

    if (isError)
        return (
            <ErrorLoadingHotelDatas
                errorMessage={error?.message}
                alterMessageError={"Không thể tải danh sách phòng vật lý. Vui lòng thử lại sau."}
            />
        )

    const filteredRooms = rooms?.filter(room =>
        room.room_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBRoomHeader motion={motion} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            className={clsx(
                    "flex flex-1 min-h-0 w-full flex-col",
                    "overflow-hidden",
                    "rounded-xl border border-gray-200 bg-white shadow-sm"
                )}
            >
                <DBRoomToolBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <DBRoomTable filteredRooms={filteredRooms} />
                <DBRoomPagination filteredRooms={filteredRooms} />
            </motion.div>
        </div>
    )
}
