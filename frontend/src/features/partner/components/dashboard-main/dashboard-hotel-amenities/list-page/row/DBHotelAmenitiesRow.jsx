import DBHotelAmenitiesRowDatas from "./DBHotelAmenitiesRowDatas"
import DBHotelAmenitiesRowActions from "./DBHotelAmenitiesRowActions"
import DBRoomActionsButton from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeActionsButton"

import DeleteHotelAmenitiesModal from "../../modal/DeleteHotelAmenitiesModal"
import EditHotelAmenitiesModal from "../../modal/EditHotelAmenitiesModal"

import { useState } from "react"

import usePartnerRoomModals from "../../../../../../../hooks/dashboard/partner/room-type-hooks/modals/usePartnerRoomModals"
import { useDeletePartnerHotelAmenity } from "../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenityMutations"

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
            <DBHotelAmenitiesRowDatas amenity={amenity} />

            <td className="p-4 text-center relative" ref={menuRef}>
                <DBRoomActionsButton
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                {isMenuOpen && (
                    <DBHotelAmenitiesRowActions
                        setIsMenuOpen={setIsMenuOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                    />
                )}

                {isEditModalOpen && (
                    <EditHotelAmenitiesModal
                        setIsEditModalOpen={setIsEditModalOpen}
                        handleSaveAmenityEdit={handleSaveAmenityEdit}
                        editForm={editForm}
                        setEditForm={setEditForm}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteHotelAmenitiesModal
                        amenity={amenity}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDeleteAmenity={handleDeleteAmenity}
                    />
                )}
            </td>
        </tr>
    )
}
