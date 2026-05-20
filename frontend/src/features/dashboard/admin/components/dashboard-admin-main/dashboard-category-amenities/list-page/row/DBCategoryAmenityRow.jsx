import DBCategoryAmenitiesActionsButton from "../../../../../ui/dashboard-main/dashboard-category-amenities/DBCategoryAmenitiesActionsButton"
import DBCategoryAmenityRowActions from "./DBCategoryAmenityRowActions"

import DeleteCategoryAmenityModal from "../../modal/DeleteCategoryAmenityModal"

import useAdminAmenityCategoryModals from "../../../../../../../../hooks/dashboard/admin/hotel-hooks/modal/useAdminAmenityCategoryModals"

import { useDeleteAdminAmenityCategory } from "../../../../../../../../hooks/dashboard/admin/hotel-hooks/services/useAdminHotelAmenityCategoriesMutations"

export default function DBCategoryAmenityRow({ category }) {
    const {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    } = useAdminAmenityCategoryModals()

    const deleteAmenityCategoryMutation = useDeleteAdminAmenityCategory()

    const handleDeleteCategory = () => {
        deleteAmenityCategoryMutation.mutate(category.id_amenity_category, {
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
                    <DBCategoryAmenitiesActionsButton
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                </div>

                {isMenuOpen && (
                    <DBCategoryAmenityRowActions
                        setIsMenuOpen={setIsMenuOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        category={category}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteCategoryAmenityModal
                        category={category}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDeleteCategory={handleDeleteCategory}
                    />
                )}
            </td>
        </tr>
    )
}
