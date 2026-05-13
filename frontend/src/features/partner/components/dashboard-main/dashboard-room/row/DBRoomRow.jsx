import DBRoomRowDatas from "./DBRoomRowDatas"
import DBRoomRowActions from "./DBRoomRowActions"
import DBRoomActionsButton from "../../../../ui/dashboard-main/dashboard-room/DBRoomActionsButton"
import DeleteRoomModal from "../modal/DeleteRoomModal"
import EditRoomModal from "../modal/EditRoomModal"

import { useState } from "react"

import useRoomModal from "../../../../../../hooks/dashboard/partner/room-type-hooks/useRoomModal"

export default function RoomTableRow({ initialRoom }) {
    const [room, setRoom] = useState(initialRoom)
    const {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    } = useRoomModal()

    const [editForm, setEditForm] = useState({
        room_name: initialRoom.room_name || "",
    })

    const handleSaveRoomEdit = (e) => {
        e.preventDefault()
        setRoom(prev => ({
            ...prev,
            room_name: editForm.room_name,
        }))
        setIsEditModalOpen(false)
    }

    const handleDeleteRoom = () => {
        setIsDeleteModalOpen(false)
    }

    return (
        <tr className="hover:bg-gray-50/80 transition-colors group">
            <DBRoomRowDatas room={room} />

            <td className="p-4 text-center relative" ref={menuRef}>
                <DBRoomActionsButton
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
