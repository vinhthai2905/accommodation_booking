import ErrorLoadingHotelDatas from "../../../../../../partner/ui/dashboard-main/common/ErrorLoadingHotelDatas"
import LoadingHotelDatas from "../../../../../../partner/ui/dashboard-main/common/LoadingHotelDatas"
import DBCreateCategoryForm from "../components/DBCreateCategoryForm"
import DBCategoryEditHeader from "./DBCategoryEditHeader"

import { clsx } from "clsx"
import { motion } from "framer-motion"
import { Edit3 } from "lucide-react"
import { FormProvider } from "react-hook-form"
import { useNavigate, useParams } from "react-router"

import usePartnerEditHotelCategoryForm from "../../../../../../../../hooks/dashboard/partner/hotel-hooks/form/usePartnerEditHotelCategoryForm"
import { usePartnerHotelCategoryDetail } from "../../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenities"
import useSuccessRedirect from "../../../../../../../../hooks/dashboard/partner/room-type-hooks/form/useSuccessRedirect"

export default function DBEditCategory() {
    const { id_amenity_category } = useParams()
    const navigate = useNavigate()

    const {
        data: category,
        isPending: isPendingCategory,
        isError,
        error
    } = usePartnerHotelCategoryDetail(id_amenity_category)

    const {
        formHookMethods,
        updateCategoryMutation,
        onSuccessValidatedForm,
        onErrorValidatedForm,
    } = usePartnerEditHotelCategoryForm(category)

    useSuccessRedirect(updateCategoryMutation, navigate, "/partner/dashboard/hotel/category-amenities")

    if (isPendingCategory)
        return <LoadingHotelDatas labelLoading="Đang tải dữ liệu danh mục tiện nghi..." />

    if (isError)
        return (
            <ErrorLoadingHotelDatas
                errorMessage={error?.message}
                alterMessageError="Không thể tải dữ liệu danh mục tiện nghi. Vui lòng thử lại sau."
            />
        )

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBCategoryEditHeader motion={motion} categoryName={category?.name} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                    "flex flex-1 min-h-0 w-full flex-col",
                    "rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
                )}
            >
                <div className="px-6 py-5 border-b border-gray-100 bg-linear-to-r from-gray-50/50 to-white flex items-center gap-3">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                        <Edit3 size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-none">Chỉnh sửa thông tin danh mục</h2>
                        <p className="text-sm text-gray-500 mt-1">Cập nhật tên và các chi tiết cơ bản của danh mục tiện nghi.</p>
                    </div>
                </div>

                <div className="p-2">
                    <FormProvider {...formHookMethods}>
                        <DBCreateCategoryForm
                            onSuccessValidatedForm={onSuccessValidatedForm}
                            onErrorValidatedForm={onErrorValidatedForm}
                            isPending={updateCategoryMutation.isPending}
                            onCancel={() => navigate(-1)}
                        />
                    </FormProvider>
                </div>
            </motion.div>
        </div>
    )
}
