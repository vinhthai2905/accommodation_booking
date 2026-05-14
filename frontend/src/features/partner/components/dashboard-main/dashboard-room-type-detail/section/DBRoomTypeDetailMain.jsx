import LoadingRoomTypeDetail from "../../../../ui/dashboard-main/common/LoadingHotelDatas"
import ErrorLoadingHotelDatas from "../../../../ui/dashboard-main/common/ErrorLoadingHotelDatas"
import DBExistingBedDetail from "../components/DBExistingBedDetail"
import DBAddBedForm from "../components/DBAddBedForm"

import { FormProvider } from "react-hook-form"

import { usePartnerRoomTypeBedDetails, usePartnerBeds } from "../../../../../../hooks/dashboard/partner/room-type-hooks/services/usePartnerRoomTypeBedDetails"

import usePartnerRoomTypeDetailsForm from "../../../../../../hooks/dashboard/partner/room-type-hooks/form/usePartnerRoomTypeDetailsForm"


export default function DBRoomTypeDetailMain({ id_room_type }) {
    const {
        data: bedDetails,
        isPending: loadingRoomTypeDetails,
        isError: isLoadingRoomTypeError,
        error: loadingRoomTypeError,
        isSuccess: successLoadedRoomTypeDetails,
    } = usePartnerRoomTypeBedDetails(id_room_type)

    const { data: availableBeds, isPending: loadingBeds } = usePartnerBeds(successLoadedRoomTypeDetails)

    const {
        formHookMethods,
        addRoomTypeDetailMutation,
        delRoolTypeDetailMutation,
        onSuccessValidatedForm,
        onErrorValidatedForm,
    } = usePartnerRoomTypeDetailsForm(id_room_type)

    if (loadingRoomTypeDetails || loadingBeds)
        return <LoadingRoomTypeDetail labelLoading={"Đang tải chi tiết cho loại phòng...."} />

    if (isLoadingRoomTypeError)
        return (
            <ErrorLoadingHotelDatas
                errorMessage={loadingRoomTypeError.message}
                alterMessageError={"Không thể tải chi tiết loại phòng. Vui lòng thử lại sau."}
            />
        )

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <DBExistingBedDetail
                bedDetails={bedDetails}
                delRoolTypeDetailMutation={delRoolTypeDetailMutation}
            />

            <FormProvider {...formHookMethods}>
                <DBAddBedForm
                    addRoomTypeDetailMutation={addRoomTypeDetailMutation}
                    availableBeds={availableBeds}
                    onSuccessValidatedForm={onSuccessValidatedForm}
                    onErrorValidatedForm={onErrorValidatedForm}
                />
            </FormProvider>
        </div>
    )
}
