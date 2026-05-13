import { useForm } from "react-hook-form"

import { useCreateRoomTypeBedDetail, useDeleteRoomTypeBedDetail } from "./usePartnerRoomTypeBedDetails"
import parseRoomTypeDetailPayload from "../../../../helpers/dashboard/partner/parseRoomTypeDetailPayload"

export default function usePartnerRoomTypeDetailsForm(id_room_type) {
    const formHookMethods = useForm({
        mode: "onChange",
        defaultValues: {
            "bedQuantity": 1
        }
    })
    const addRoomTypeDetailMutation = useCreateRoomTypeBedDetail(id_room_type)
    const delRoolTypeDetailMutation = useDeleteRoomTypeBedDetail(id_room_type)

    const onSuccessValidatedForm = (roomTypeDetailPayload) => {
        const parsedPayload = parseRoomTypeDetailPayload(roomTypeDetailPayload)
        addRoomTypeDetailMutation.mutate(parsedPayload)
    }

    const onErrorValidatedForm = () => {
    }

    return {
        formHookMethods,
        addRoomTypeDetailMutation,
        delRoolTypeDetailMutation,
        onSuccessValidatedForm,
        onErrorValidatedForm
    }
}