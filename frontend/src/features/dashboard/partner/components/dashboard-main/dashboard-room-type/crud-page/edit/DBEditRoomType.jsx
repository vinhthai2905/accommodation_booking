import DBEditRoomTypeForm from "../components/DBEditRoomTypeForm"
import DBRoomTypeEditHeader from "./DBRoomTypeEditHeader"
import LoadingHotelDatas from "../../../../../ui/dashboard-main/common/LoadingHotelDatas"
import ErrorLoadingHotelDatas from "../../../../../ui/dashboard-main/common/ErrorLoadingHotelDatas"

import { clsx } from "clsx"
import { motion } from "framer-motion"
import { FormProvider } from "react-hook-form"
import { Edit3 } from "lucide-react"

import useSuccessRedirect from "../../../../../../../../hooks/dashboard/partner/room-type-hooks/form/useSuccessRedirect"
import usePartnerEditRoomTypeForm from "../../../../../../../../hooks/dashboard/partner/room-type-hooks/form/usePartnerEditRoomTypeForm"
import useRoomTypeIDParam from "../../../../../../../../hooks/dashboard/partner/room-type-hooks/form/useRoomTypeIDParam"
import usePartnerRoomTypeDetail from "../../../../../../../../hooks/dashboard/partner/room-type-hooks/services/usePartnerRoomTypeDetail"

export default function DBEditRoomType() {
    const { id_room_type, navigate } = useRoomTypeIDParam()

    const {
        data: roomType,
        isPending: isPendingRoomType,
        isError,
        error
    } = usePartnerRoomTypeDetail(id_room_type)

    const {
        formHookMethods,
        updateRoomTypeMutation,
        onSuccessValidatedForm,
        onErrorValidatedForm,
    } = usePartnerEditRoomTypeForm(roomType)

    useSuccessRedirect(updateRoomTypeMutation, navigate, "/partner/dashboard/hotel/room-type")

    if (isPendingRoomType)
        return <LoadingHotelDatas labelLoading="Đang tải dữ liệu loại phòng..." />

    if (isError)
        return (
            <ErrorLoadingHotelDatas
                errorMessage={error.message}
                alterMessageError="Không thể tải dữ liệu loại phòng. Vui lòng thử lại sau."
            />
        )

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBRoomTypeEditHeader motion={motion} roomTypeName={roomType?.type_name} />

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
                        <p className="text-sm text-gray-500 mt-1">Cập nhật các thông tin cơ bản cho loại phòng.</p>
                    </div>
                </div>

                <div className="p-2">
                    <FormProvider {...formHookMethods}>
                        <DBEditRoomTypeForm
                            onSuccessValidatedForm={onSuccessValidatedForm}
                            onErrorValidatedForm={onErrorValidatedForm}
                            roomType={roomType}
                            isPending={updateRoomTypeMutation.isPending}
                            onCancel={() => navigate(-1)}
                        />
                    </FormProvider>
                </div>
            </motion.div>
        </div>
    )
}
