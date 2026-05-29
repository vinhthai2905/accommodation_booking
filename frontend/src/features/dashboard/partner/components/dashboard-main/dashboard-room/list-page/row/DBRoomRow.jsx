import DBRoomRowDatas from "./DBRoomRowDatas"
import DBRoomRowActions from "./DBRoomRowActions"
import DBRoomActionButton from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeActionsButton"

import DeleteRoomModal from "../../modal/DeleteRoomModal"
import EditRoomModal from "../../modal/EditRoomModal"

import { useState } from "react"
import { useParams } from "react-router"
import toast from "react-hot-toast"

import usePartnerRoomModals from "../../../../../../../../hooks/dashboard/partner/room-type-hooks/modals/usePartnerRoomModals"
import { 
    useUpdatePhysicalRoomMutation, 
    useDeletePhysicalRoomMutation 
} from "../../../../../../../../hooks/dashboard/partner/room-type-hooks/services/usePartnerRoomTypeMutations"

export default function RoomTableRow({ initialRoom }) {
    const { id_room_type } = useParams()
    const [room, setRoom] = useState(initialRoom)
    const {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    } = usePartnerRoomModals()

    const updateRoomMutation = useUpdatePhysicalRoomMutation(id_room_type)
    const deleteRoomMutation = useDeletePhysicalRoomMutation(id_room_type)

    const [editForm, setEditForm] = useState({
        room_name: initialRoom.room_name || "",
        status: initialRoom.status || "AVAILABLE",
    })

    const handleSaveRoomEdit = (e) => {
        e.preventDefault()
        
        updateRoomMutation.mutate(
            { id_room: room.id_room, payload: editForm },
            {
                onSuccess: (data) => {
                    setRoom(data) // Update local state with the returned new room data
                    setIsEditModalOpen(false)
                    toast.success("Cập nhật tên phòng thành công!")
                },
                onError: (error) => {
                    toast.error(error.response?.data?.error || "Đã xảy ra lỗi khi cập nhật phòng.")
                }
            }
        )
    }

    const handleDeleteRoom = () => {
        deleteRoomMutation.mutate(room.id_room, {
            onSuccess: () => {
                setIsDeleteModalOpen(false)
                toast.success("Xóa phòng thành công!")
            },
            onError: (error) => {
                toast.error(error.response?.data?.error || "Đã xảy ra lỗi khi xóa phòng.")
            }
        })
    }

    return (
        <tr className="hover:bg-gray-50/80 transition-colors group">
            <DBRoomRowDatas room={room} />

            <td className="p-4 text-center relative" ref={menuRef}>
                <DBRoomActionButton
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                {isMenuOpen && (
                    <DBRoomRowActions
                        setIsMenuOpen={setIsMenuOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                    />
                )}

                {isEditModalOpen && (
                    <EditRoomModal
                        setIsEditModalOpen={setIsEditModalOpen}
                        handleSaveRoomEdit={handleSaveRoomEdit}
                        editForm={editForm}
                        setEditForm={setEditForm}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteRoomModal
                        room={room}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDeleteRoom={handleDeleteRoom}
                    />
                )}
            </td>
        </tr>
    )
}
