import { useForm } from "react-hook-form"

import { useCreateRoomTypeMutation } from "../services/usePartnerRoomTypeMutations"
import { parseCreateRoomTypePayload } from "../../../../../helpers/dashboard/partner/parseCreateRoomTypePayload"
import { CodeSquare } from "lucide-react"

export default function usePartnerCreateRoomTypeForm() {
    const formHookMethods = useForm({
        mode: "onChange",
    })

    const createRoomTypeMutation = useCreateRoomTypeMutation()

    const onSuccessValidatedForm = (formData) => {
        const payload = parseCreateRoomTypePayload(formData)

        createRoomTypeMutation.mutate(payload)
    }

    const onErrorValidatedForm = () => {
        console.log("haha")
     }

    return {
        formHookMethods,
        createRoomTypeMutation,
        onSuccessValidatedForm,
        onErrorValidatedForm,
    }
}
