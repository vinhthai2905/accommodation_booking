import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function useUserProfileForm(userProfile, handleMutatingField, handleMutatingName) {
    const methods = useForm({
        mode: "onChange"
    })
    const { reset } = methods

    const onMutatingValidatedField = (payload, choice) => {
        if (choice === "field")
            handleMutatingField(payload.field, payload.value)
        else
            handleMutatingName(payload.firstName, payload.lastName)
    }

    const onErrorValidatedField = () => {
        
    }

    useEffect(() => {
        if (userProfile?.personal_info) {
            reset({
                first_name: userProfile.personal_info.first_name || "",
                last_name: userProfile.personal_info.last_name || "",
                display_name: userProfile.personal_info.display_name || "",
                phone_number: userProfile.personal_info.phone_number || "",
                date_of_birth: userProfile.personal_info.date_of_birth || "",
                country: userProfile.personal_info.country || "",
                gender: userProfile.personal_info.gender || "",
                address: userProfile.personal_info.address || ""
            })
        }
    }, [userProfile, reset])

    return {
        methods,
        onMutatingValidatedField
    }
}
