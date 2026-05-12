import DBRoomTypeRowDatas from "./DBRoomTypeRowDatas"
import DBRoomTypeRowActions from "./DBRoomTypeRowActions"
import DBRoomTypeActionsButton from "../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeActionsButton"
import DeleteRoomTypeModal from "../modal/DeleteRoomTypeModal"
import EditRoomTypeModal from "../modal/EditRoomTypeModal"

import { useState } from "react"

import useRoomTypeCRUD from "../../../../../../hooks/dashboard/partner/useRoomTypeCRUD"

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
    } = useRoomTypeCRUD()

    
    // Form state for editing
    const [editForm, setEditForm] = useState({
        type_name: initialRoom.type_name || "",
        max_capacity: initialRoom.max_capacity || "",
        price: initialRoom.price || "",
        total_rooms: initialRoom.total_rooms || 0,
    })

    const handleSaveRoomTypeEdit = (e) => {
        e.preventDefault()
        setRoom(prev => ({
            ...prev,
            type_name: editForm.type_name,
            max_capacity: editForm.max_capacity,
            price: editForm.price,
            total_rooms: Number(editForm.total_rooms),
        }))
        setIsEditModalOpen(false)
    }

    const handleDeleteRoomType = () => {
        setIsDeleteModalOpen(false)
    }

    return (
        <tr className="text-center hover:bg-gray-50/80 transition-colors group">
            <DBRoomTypeRowDatas room={room} />

            <td className="p-4 text-center relative" ref={menuRef}>
                <DBRoomTypeActionsButton
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                {isMenuOpen && (
                    <DBRoomTypeRowActions
                        setIsMenuOpen={setIsMenuOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                    />
                )}

                {isEditModalOpen && (
                    <EditRoomTypeModal
                        setIsEditModalOpen={setIsEditModalOpen}
                        handleSaveRoomTypeEdit={handleSaveRoomTypeEdit}
                        editForm={editForm}
                        setEditForm={setEditForm}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteRoomTypeModal
                        room={room}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDeleteRoomType={handleDeleteRoomType}
                    />
                )}
            </td>
        </tr>
    )
}