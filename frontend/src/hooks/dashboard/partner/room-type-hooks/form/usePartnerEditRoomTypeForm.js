import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useUpdateRoomTypeMutation } from "../services/usePartnerRoomTypeMutations"
import { parseCreateRoomTypePayload } from "../../../../../helpers/dashboard/partner/parseCreateRoomTypePayload"

export default function usePartnerEditRoomTypeForm(roomType) {
    const id_room_type = roomType?.id_room_type

    const formHookMethods = useForm({
        mode: "onChange",
        defaultValues: {
            typeName: "",
            maxCapacity: 1,
            totalRooms: 0,
            price: 0,
        },
    })
    const { reset } = formHookMethods


    useEffect(() => {
        if (!roomType) return

        reset({
            typeName: roomType.type_name,
            maxCapacity: roomType.max_capacity,
            totalRooms: roomType.total_rooms,
            price: roomType.price,
        })
    }, [roomType, reset],
    )


    const updateRoomTypeMutation = useUpdateRoomTypeMutation()

    const onSuccessValidatedForm = (formData) => {
        const payload = parseCreateRoomTypePayload(formData)
        updateRoomTypeMutation.mutate({ id_room_type, payload })
    }

    const onErrorValidatedForm = () => { }

    return {
        formHookMethods,
        updateRoomTypeMutation,
        onSuccessValidatedForm,
        onErrorValidatedForm,

    }
}
