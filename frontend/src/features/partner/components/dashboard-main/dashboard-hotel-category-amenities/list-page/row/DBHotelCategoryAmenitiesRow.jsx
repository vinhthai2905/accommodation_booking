import DBHotelCategoryAmenitiesRowDatas from "./DBHotelCategoryAmenitiesRowDatas"
import DBHotelCategoryAmenitiesRowActions from "./DBHotelCategoryAmenitiesRowActions"
import DBRoomActionsButton from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeActionsButton"

import DeleteHotelCategoryAmenitiesModal from "../../modal/DeleteHotelCategoryAmenitiesModal"
import EditHotelCategoryAmenitiesModal from "../../modal/EditHotelCategoryAmenitiesModal"

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
            <DBHotelCategoryAmenitiesRowDatas amenity={amenity} />

            <td className="p-4 text-center relative w-28 whitespace-nowrap" ref={menuRef}>
                <DBRoomActionsButton
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                {isMenuOpen && (
                    <DBHotelCategoryAmenitiesRowActions
                        setIsMenuOpen={setIsMenuOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                    />
                )}

                {isEditModalOpen && (
                    <EditHotelCategoryAmenitiesModal
                        setIsEditModalOpen={setIsEditModalOpen}
                        handleSaveAmenityEdit={handleSaveAmenityEdit}
                        editForm={editForm}
                        setEditForm={setEditForm}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteHotelCategoryAmenitiesModal
                        amenity={amenity}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDeleteAmenity={handleDeleteAmenity}
                    />
                )}
            </td>
        </tr>
    )
}
