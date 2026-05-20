import DBRoomActionsButton from "../../../../../../partner/ui/dashboard-main/dashboard-room/DBRoomActionsButton"
import DBAmenitiesRowActions from "./DBAmenitiesRowActions"
import DBAmenitiesRowDatas from "./DBAmenitiesRowDatas"

import DeleteAmenitiesModal from "../../modal/DeleteAmenitiesModal"
import EditAmenitiesModal from "../../modal/EditAmenitiesModal"

import { useState } from "react"

import { useDeletePartnerHotelAmenity } from "../../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenityMutations"
import usePartnerRoomModals from "../../../../../../../../hooks/dashboard/partner/room-type-hooks/modals/usePartnerRoomModals"

export default function HotelAmenityTableRow({ initialAmenity }) {
    const [amenity, setAmenity] = useState(initialAmenity)
    const {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    } = usePartnerRoomModals()
    const { mutate: deleteAmenity } = useDeletePartnerHotelAmenity()

    const [editForm, setEditForm] = useState({
        amenity_name: initialAmenity.amenity_name || "",
    })

    const handleSaveAmenityEdit = (e) => {
        e.preventDefault()
        setAmenity(prev => ({
            ...prev,
            amenity_name: editForm.amenity_name,
        }))
        setIsEditModalOpen(false)
    }

    const handleDeleteAmenity = () => {
        deleteAmenity(amenity.id_hotel_amenity, {
            onSuccess: () => setIsDeleteModalOpen(false)
        })
    }

    return (
        <tr className="hover:bg-gray-50/80 transition-colors group">
            <DBAmenitiesRowDatas amenity={amenity} />

            <td className="p-4 text-center relative" ref={menuRef}>
                <DBRoomActionsButton
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                {isMenuOpen && (
                    <DBAmenitiesRowActions
                        setIsMenuOpen={setIsMenuOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                    />
                )}

                {isEditModalOpen && (
                    <EditAmenitiesModal
                        setIsEditModalOpen={setIsEditModalOpen}
                        handleSaveAmenityEdit={handleSaveAmenityEdit}
                        editForm={editForm}
                        setEditForm={setEditForm}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteAmenitiesModal
                        amenity={amenity}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDeleteAmenity={handleDeleteAmenity}
                    />
                )}
            </td>
        </tr>
    )
}
