import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useUpdatePartnerHotelMutation } from "../services/usePartnerHotelMutations"

export default function usePartnerEditHotelForm(hotel) {
    const formHookMethods = useForm({
        mode: "onChange",
        defaultValues: {
            hotelName: "",
            address: "",
        },
    })
    const { reset } = formHookMethods

    useEffect(() => {
        if (!hotel) return

        reset({
            hotelName: hotel.name,
            address: hotel.address,
        })
    }, [hotel, reset])

    const updateHotelMutation = useUpdatePartnerHotelMutation()

    const onSuccessValidatedForm = (formData) => {
        const payload = {
            name: formData.hotelName,
            address: formData.address,
        }
        updateHotelMutation.mutate(payload)
    }

    const onErrorValidatedForm = () => { }

    return {
        formHookMethods,
        updateHotelMutation,
        onSuccessValidatedForm,
        onErrorValidatedForm,
    }
}
