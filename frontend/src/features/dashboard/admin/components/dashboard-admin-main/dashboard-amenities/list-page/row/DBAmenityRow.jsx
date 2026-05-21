import DBRoomActionsButton from "../../../../../../partner/ui/dashboard-main/dashboard-room/DBRoomActionsButton"
import DBAmenitiesRowActions from "./DBAmenitiesRowActions"
import DBAmenitiesRowDatas from "./DBAmenitiesRowDatas"

import EditAmenityModal from "../../modal/EditAmenityModal"
import DeleteAmenityModal from "../../modal/DeleteAmenityModal"

import { useState } from "react"

import { 
    useUpdateAdminAmenity,
    useDeleteAdminAmenity 
} from "../../../../../../../../hooks/dashboard/admin/hotel-hooks/services/useAdminHotelAmenitiesMutations"
import usePartnerRoomModals from "../../../../../../../../hooks/dashboard/partner/room-type-hooks/modals/usePartnerRoomModals"

export default function DBAmenityRow({ initialAmenity }) {
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
    const { mutate: updateAmenity } = useUpdateAdminAmenity()
    const { mutate: deleteAmenity } = useDeleteAdminAmenity()

    const [editForm, setEditForm] = useState({
        name: initialAmenity.name || "",
    })

    const handleSaveAmenityEdit = (e) => {
        e.preventDefault()
        updateAmenity({
            id_amenity_type: amenity.id_amenity_type,
            payload: { name: editForm.name }
        }, {
            onSuccess: () => {
                setAmenity(prev => ({
                    ...prev,
                    name: editForm.name,
                }))
                setIsEditModalOpen(false)
            }
        })
    }

    const handleDeleteAmenity = () => {
        deleteAmenity(amenity.id_amenity_type, {
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
                    <EditAmenityModal
                        setIsEditModalOpen={setIsEditModalOpen}
                        handleSaveAmenityEdit={handleSaveAmenityEdit}
                        editForm={editForm}
                        setEditForm={setEditForm}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteAmenityModal
                        amenity={amenity}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDeleteAmenity={handleDeleteAmenity}
                    />
                )}
            </td>
        </tr>
    )
}
