import LoadingHotelRooms from "../../ui/loading/LoadingHotelDatas"
import ErrorLoadingHotelRooms from "../../ui/loading/ErrorLoadingHotelDatas"

import DBRoomHeader from "../../ui/dashboard-main/list-page/DBListHeader"
import DBRoomPagination from "../components/dashboard-main/dashboard-room/list-page/section/DBRoomPagination"
import DBRoomTable from "../components/dashboard-main/dashboard-room/list-page/section/DBRoomTable"
import DBRoomToolBar from "../components/dashboard-main/dashboard-room/list-page/section/DBRoomToolBar"

import { clsx } from "clsx"
import { useState } from "react"
import { motion } from "framer-motion"
import { useParams } from "react-router"

import usePartnerRooms from "../../../../hooks/dashboard/partner/room-type-hooks/services/usePartnerRooms"

import CreateRoomModal from "../components/dashboard-main/dashboard-room/modal/CreateRoomModal"
import usePartnerCreateRoomForm from "../../../../hooks/dashboard/partner/room-type-hooks/form/usePartnerCreateRoomForm"

export default function DashboardRooms() {
    const { id_room_type } = useParams()
    const { data: rooms, isPending, isError, error } = usePartnerRooms(id_room_type, true)
    const [searchTerm, setSearchTerm] = useState("")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const { createForm, setCreateForm, handleCreateRoom, isCreating } = usePartnerCreateRoomForm(id_room_type, setIsCreateModalOpen)

    if (isPending)
        return <LoadingHotelRooms labelLoading={"Đang tải dữ liệu phòng vật lý..."} />

    if (isError)
        return (
            <ErrorLoadingHotelRooms
                errorMessage={error?.message}
                alterMessageError={"Không thể tải danh sách phòng vật lý. Vui lòng thử lại sau."}
            />
        )

    const filteredRooms = rooms?.filter(room =>
        room.room_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBRoomHeader 
                 
                listLabel={"Danh sách phòng vật lý"}
                instructionLabel={"Quản lý các phòng thực tế của loại phòng này tại đây."}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            className={clsx(
                    "flex flex-1 min-h-0 w-full flex-col",
                    "overflow-hidden",
                    "rounded-xl border border-gray-200 bg-white shadow-sm"
                )}
            >
                <DBRoomToolBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setIsCreateModalOpen={setIsCreateModalOpen} />
                <DBRoomTable filteredRooms={filteredRooms} />
                <DBRoomPagination filteredRooms={filteredRooms} />
            </motion.div>
            
            {isCreateModalOpen && (
                <CreateRoomModal
                    setIsCreateModalOpen={setIsCreateModalOpen}
                    handleCreateRoom={handleCreateRoom}
                    createForm={createForm}
                    setCreateForm={setCreateForm}
                    isCreating={isCreating}
                />
            )}
        </div>
    )
}
