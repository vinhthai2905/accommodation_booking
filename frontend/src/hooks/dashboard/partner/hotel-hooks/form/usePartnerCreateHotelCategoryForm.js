import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useCreatePartnerHotelCategory } from "../services/usePartnerHotelAmenityMutations"

export default function usePartnerCreateHotelCategoryForm() {
    const formHookMethods = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            slug: "",
        }
    })

    const { watch, setValue } = formHookMethods
    const name = watch("name")

    useEffect(() => {
        if (name !== undefined) {
            const slug = (name || "")
                .toLowerCase()
                .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
                .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
                .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                .replace(/đ/g, "d")
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "")
            setValue("slug", slug)
        }
    }, [name, setValue])

    const createCategoryMutation = useCreatePartnerHotelCategory()

    const onSuccessValidatedForm = (formData) => {
        createCategoryMutation.mutate(formData)
    }

    const onErrorValidatedForm = (errors) => {
        console.log("Validation errors:", errors)
    }

    return {
        formHookMethods,
        createCategoryMutation,
        onSuccessValidatedForm,
        onErrorValidatedForm,
    }
}
