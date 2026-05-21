import DBRoomActionsButton from "../../../../../../partner/ui/dashboard-main/dashboard-room/DBRoomActionsButton"
import DBWardsRowActions from "./DBWardsRowActions"
import DBWardsRowDatas from "./DBWardsRowDatas"

import EditWardModal from "../../modal/EditWardModal"
import DeleteWardModal from "../../modal/DeleteWardModal"

import { useState } from "react"

import { useUpdateAdminWard, useDeleteAdminWard } from "../../../../../../../../hooks/dashboard/admin/location-hooks/services/useAdminWardMutations"
import usePartnerRoomModals from "../../../../../../../../hooks/dashboard/partner/room-type-hooks/modals/usePartnerRoomModals"
import { useAdminCities } from "../../../../../../../../hooks/dashboard/admin/location-hooks/services/useAdminCities"

export default function DBWardRow({ initialWard }) {
    const [ward, setWard] = useState(initialWard)
    const {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    } = usePartnerRoomModals()
    
    const { data: cities } = useAdminCities()
    const { mutate: updateWard } = useUpdateAdminWard()
    const { mutate: deleteWard } = useDeleteAdminWard()

    const [editForm, setEditForm] = useState({
        ward_name: initialWard.ward_name || "",
        id_city: initialWard.id_city || "",
    })

    const handleSaveWardEdit = (e) => {
        e.preventDefault()
        updateWard({
            id_ward: ward.id_ward,
            payload: { 
                ward_name: editForm.ward_name,
                id_city: Number(editForm.id_city)
            }
        }, {
            onSuccess: () => {
                const selectedCity = cities?.find(c => c.id_city === Number(editForm.id_city))
                setWard(prev => ({
                    ...prev,
                    ward_name: editForm.ward_name,
                    id_city: Number(editForm.id_city),
                    city_name: selectedCity ? selectedCity.city_name : prev.city_name
                }))
                setIsEditModalOpen(false)
            }
        })
    }

    const handleDeleteWard = () => {
        deleteWard(ward.id_ward, {
            onSuccess: () => setIsDeleteModalOpen(false)
        })
    }

    return (
        <tr className="hover:bg-gray-50/80 transition-colors group">
            <DBWardsRowDatas ward={ward} />

            <td className="p-4 text-center relative" ref={menuRef}>
                <DBRoomActionsButton
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                {isMenuOpen && (
                    <DBWardsRowActions
                        setIsMenuOpen={setIsMenuOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                    />
                )}

                {isEditModalOpen && (
                    <EditWardModal
                        setIsEditModalOpen={setIsEditModalOpen}
                        handleSaveWardEdit={handleSaveWardEdit}
                        editForm={editForm}
                        setEditForm={setEditForm}
                        cities={cities}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteWardModal
                        ward={ward}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDeleteWard={handleDeleteWard}
                    />
                )}
            </td>
        </tr>
    )
}
