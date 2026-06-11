import DBRoomActionsButton from "../../../../../../partner/ui/dashboard-main/dashboard-room/DBRoomActionsButton"
import DBHotelTypesRowActions from "./DBHotelTypesRowActions"
import DBHotelTypesRowDatas from "./DBHotelTypesRowDatas"

import EditHotelTypeModal from "../../modal/EditHotelTypeModal"
import DeleteHotelTypeModal from "../../modal/DeleteHotelTypeModal"

import { useState } from "react"
import { useUpdateAdminHotelType, useDeleteAdminHotelType } from "../../../../../../../../hooks/dashboard/admin/hotel-types-hooks/useAdminHotelTypeMutations"
import usePartnerRoomModals from "../../../../../../../../hooks/dashboard/partner/room-type-hooks/modals/usePartnerRoomModals"

export default function DBHotelTypeRow({ initialHotelType }) {
    const [hotelType, setHotelType] = useState(initialHotelType)
    const {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    } = usePartnerRoomModals()
    
    const { mutate: updateHotelType } = useUpdateAdminHotelType()
    const { mutate: deleteHotelType } = useDeleteAdminHotelType()

    const [editForm, setEditForm] = useState({
        name: initialHotelType.name || "",
    })

    const handleSaveHotelTypeEdit = (e) => {
        e.preventDefault()
        
        const generatedSlug = editForm.name.toLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")

        updateHotelType({
            id: hotelType.id,
            payload: { 
                name: editForm.name,
                slug: generatedSlug,
            }
        }, {
            onSuccess: () => {
                setHotelType(prev => ({
                    ...prev,
                    name: editForm.name,
                    slug: generatedSlug,
                }))
                setIsEditModalOpen(false)
            }
        })
    }

    const handleDeleteHotelType = () => {
        deleteHotelType(hotelType.id, {
            onSuccess: () => setIsDeleteModalOpen(false)
        })
    }

    return (
        <tr className="hover:bg-gray-50/80 transition-colors group">
            <DBHotelTypesRowDatas hotelType={hotelType} />

            <td className="p-4 text-center relative" ref={menuRef}>
                <DBRoomActionsButton
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                {isMenuOpen && (
                    <DBHotelTypesRowActions
                        setIsMenuOpen={setIsMenuOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                    />
                )}

                {isEditModalOpen && (
                    <EditHotelTypeModal
                        setIsEditModalOpen={setIsEditModalOpen}
                        handleSaveHotelTypeEdit={handleSaveHotelTypeEdit}
                        editForm={editForm}
                        setEditForm={setEditForm}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteHotelTypeModal
                        hotelType={hotelType}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDeleteHotelType={handleDeleteHotelType}
                    />
                )}
            </td>
        </tr>
    )
}
