import DBEditHotelForm from "../components/DBEditHotelForm"
import DBHotelEditHeader from "./DBHotelEditHeader"
import DBHotelImageGallery from "../components/DBHotelImageGallery"
import LoadingHotelDatas from "../../../../../ui/dashboard-main/common/LoadingHotelDatas"
import ErrorLoadingHotelDatas from "../../../../../ui/dashboard-main/common/ErrorLoadingHotelDatas"

import { clsx } from "clsx"
import { motion } from "framer-motion"
import { FormProvider } from "react-hook-form"
import { Edit3 } from "lucide-react"

import useSuccessRedirect from "../../../../../../../hooks/dashboard/partner/room-type-hooks/form/useSuccessRedirect"
import usePartnerHotel from "../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerHotel"
import usePartnerEditHotelForm from "../../../../../../../hooks/dashboard/partner/hotel-hooks/form/usePartnerEditHotelForm"
import { useNavigate } from "react-router"

export default function DBEditHotel() {
    const navigate = useNavigate()

    const {
        data: hotel,
        isPending: isPendingHotel,
        isError,
        error
    } = usePartnerHotel()

    const {
        formHookMethods,
        updateHotelMutation,
        onSuccessValidatedForm,
        onErrorValidatedForm,
    } = usePartnerEditHotelForm(hotel)

    useSuccessRedirect(updateHotelMutation, navigate, "/partner/dashboard/hotel/info")

    if (isPendingHotel)
        return <LoadingHotelDatas labelLoading="Đang tải dữ liệu khách sạn..." />

    if (isError)
        return (
            <ErrorLoadingHotelDatas
                errorMessage={error.message}
                alterMessageError="Không thể tải dữ liệu khách sạn. Vui lòng thử lại sau."
            />
        )

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBHotelEditHeader motion={motion} hotelName={hotel?.name} />

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
                        <h2 className="text-lg font-bold text-gray-900 leading-none">Chỉnh sửa thông tin</h2>
                        <p className="text-sm text-gray-500 mt-1">Cập nhật các thông tin cơ bản cho khách sạn.</p>
                    </div>
                </div>

                <div className="p-2">
                    <FormProvider {...formHookMethods}>
                        <DBEditHotelForm
                            onSuccessValidatedForm={onSuccessValidatedForm}
                            onErrorValidatedForm={onErrorValidatedForm}
                            isPending={updateHotelMutation.isPending}
                            onCancel={() => navigate(-1)}
                        />
                    </FormProvider>
                </div>
            </motion.div>


        </div>
    )
}
