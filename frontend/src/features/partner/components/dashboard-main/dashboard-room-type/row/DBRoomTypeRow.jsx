import DBRoomTypeRowDatas from "./DBRoomTypeRowDatas"
import DBRoomTypeRowActions from "./DBRoomTypeRowActions"
import DBRoomTypeActionsButton from "../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeActionsButton"
import DeleteRoomTypeModal from "../modal/section/DeleteRoomTypeModal"
import EditRoomTypeModal from "../modal/section/EditRoomTypeModal"

import { useState } from "react"

import useRoomTypeModal from "/src/hooks/dashboard/partner/room-type-hooks/useRoomTypeModal"

export default function DBRoomTypeRow({ initialRoom }) {
    const [room, setRoom] = useState(initialRoom)
    const {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    } = useRoomTypeModal()

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
                        room={room}
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