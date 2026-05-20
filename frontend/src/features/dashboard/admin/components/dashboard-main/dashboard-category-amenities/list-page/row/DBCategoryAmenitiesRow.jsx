import DBRoomActionsButton from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeActionsButton"
import DBCategoryAmenitiesRowActions from "./DBCategoryAmenitiesRowActions"
import DBCategoryAmenitiesRowDatas from "./DBCategoryAmenitiesRowDatas"

import DeleteCategoryAmenitiesModal from "../../modal/DeleteCategoryAmenitiesModal"
import EditCategoryAmenitiesModal from "../../modal/EditCategoryAmenitiesModal"

import { useState } from "react"

import { useDeletePartnerHotelAmenity } from "../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenityMutations"
import usePartnerRoomModals from "../../../../../../../hooks/dashboard/partner/room-type-hooks/modals/usePartnerRoomModals"

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
            <DBCategoryAmenitiesRowDatas amenity={amenity} />

            <td className="p-4 text-center relative w-28 whitespace-nowrap" ref={menuRef}>
                <DBRoomActionsButton
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                {isMenuOpen && (
                    <DBCategoryAmenitiesRowActions
                        setIsMenuOpen={setIsMenuOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                    />
                )}

                {isEditModalOpen && (
                    <EditCategoryAmenitiesModal
                        setIsEditModalOpen={setIsEditModalOpen}
                        handleSaveAmenityEdit={handleSaveAmenityEdit}
                        editForm={editForm}
                        setEditForm={setEditForm}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteCategoryAmenitiesModal
                        amenity={amenity}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDeleteAmenity={handleDeleteAmenity}
                    />
                )}
            </td>
        </tr>
    )
}
