import DBRoomTypeRowDatas from "./DBRoomTypeRowDatas"
import DBRoomTypeRowActions from "./DBRoomTypeRowActions"
import DBRoomTypeActionsButton from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeActionsButton"
import DeleteRoomTypeModal from "../../crud/delete/DeleteRoomTypeModal"

import { useState } from "react"

import usePartnerRoomTypeModals from "/src/hooks/dashboard/partner/room-type-hooks/modals/usePartnerRoomTypeModals"
import { useDeleteRoomTypeMutation } from "../../../../../../../hooks/dashboard/partner/room-type-hooks/services/usePartnerRoomTypeMutations"

export default function DBRoomTypeRow({ initialRoom }) {
    const [room, setRoom] = useState(initialRoom)

    const {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    } = usePartnerRoomTypeModals()

    const handleDeleteRoomType = useDeleteRoomTypeMutation(room.id_room_type, setIsDeleteModalOpen)

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
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        room={room}
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