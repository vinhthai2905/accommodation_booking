import LoadingRoomTypeDetail from "../../../../ui/dashboard-main/common/LoadingHotelDatas"
import DBExistingBedDetail from "../components/DBExistingBedDetail"
import DBAddBedForm from "../components/DBAddBedForm"

import { useState } from "react"

import {
    usePartnerBeds,
    usePartnerRoomTypeBedDetails,
    useCreateRoomTypeBedDetail,
    useDeleteRoomTypeBedDetail,
} from "../../../../../../hooks/dashboard/partner/room-type-hooks/usePartnerRoomTypeBedDetails"
import ErrorLoadingHotelDatas from "../../../../ui/dashboard-main/common/ErrorLoadingHotelDatas"
import LoadingHotelDatas from "../../../../ui/dashboard-main/common/LoadingHotelDatas"


export default function DBRoomTypeDetailMain({ id_room_type }) {
    const { 
        data: bedDetails, 
        isPending: loadingRoomTypeDetails, 
        isError: isLoadingRoomTypeError, 
        error: loadingRoomTypeError
    } = usePartnerRoomTypeBedDetails(id_room_type)
    const { data: availableBeds, isPending: loadingBeds } = usePartnerBeds(id_room_type)

    const addRoomTypeDetailMutation = useCreateRoomTypeBedDetail(id_room_type)
    const delRoolTypeDetailMutation = useDeleteRoomTypeBedDetail(id_room_type)

    const [form, setForm] = useState({ id_bed: "", bed_quantity: 1 })

    const handleAdd = (e) => {
        e.preventDefault()
        if (!form.id_bed) return
        addRoomTypeDetailMutation.mutate(
            { id_bed: Number(form.id_bed), bed_quantity: Number(form.bed_quantity) },
            { onSuccess: () => setForm({ id_bed: "", bed_quantity: 1 }) }
        )
    }

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

            <DBAddBedForm
                handleAdd={handleAdd}
                form={form}
                availableBeds={availableBeds}
                setForm={setForm}
                addRoomTypeDetailMutation={addRoomTypeDetailMutation}
            />
        </div>
    )
}
