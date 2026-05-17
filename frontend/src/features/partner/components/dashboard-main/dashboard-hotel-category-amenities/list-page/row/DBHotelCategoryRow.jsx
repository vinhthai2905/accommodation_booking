import DBHotelCategoryActionsButton from "../../../../../ui/dashboard-main/dashboard-hotel-category-amenities/DBHotelCategoryActionsButton"
import DBHotelCategoryRowActions from "./DBHotelCategoryRowActions"
import DeleteHotelCategoryModal from "../../crud-page/delete/DeleteHotelCategoryModal"

import { useState } from "react"
import usePartnerHotelCategoryModals from "../../../../../../../hooks/dashboard/partner/hotel-hooks/modals/usePartnerHotelCategoryModals"
import { useDeletePartnerHotelCategory } from "../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenityMutations"

export default function DBHotelCategoryRow({ category }) {
    const {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    } = usePartnerHotelCategoryModals()

    const deleteCategoryMutation = useDeletePartnerHotelCategory()

    const handleDeleteCategory = () => {
        deleteCategoryMutation.mutate(category.id_amenity_category, {
            onSuccess: () => {
                setIsDeleteModalOpen(false)
            }
        })
    }

    return (
        <tr className="hover:bg-gray-50/80 transition-colors group">
            <td className="p-4">
                <div className="text-gray-400 text-xs font-mono">#{category.id_amenity_category}</div>
            </td>
            <td className="p-4">
                <div className="font-semibold text-gray-900">{category.name}</div>
            </td>
            <td className="p-4">
                <div className="text-gray-500 font-mono text-xs">{category.slug}</div>
            </td>
            <td className="p-4 text-center relative" ref={menuRef}>
                <div className="flex justify-center">
                    <DBHotelCategoryActionsButton
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                </div>

                {isMenuOpen && (
                    <DBHotelCategoryRowActions
                        setIsMenuOpen={setIsMenuOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        category={category}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteHotelCategoryModal
                        category={category}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDeleteCategory={handleDeleteCategory}
                    />
                )}
            </td>
        </tr>
    )
}
