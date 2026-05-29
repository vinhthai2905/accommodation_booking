import { useForm } from "react-hook-form"
import { useEffect } from "react"

import { useUpdateAdminAmenityCategory } from "../services/useAdminHotelAmenityCategoriesMutations"

export default function useAdminEditAmenityCategoryForm(category) {
    const formHookMethods = useForm({
        mode: "onChange",
        defaultValues: {
            name: category?.name || "",
            slug: category?.slug || "",
        }
    })

    const { watch, setValue, reset } = formHookMethods
    const name = watch("name")

    useEffect(() => {
        if (category) {
            reset({
                name: category.name || "",
                slug: category.slug || "",
            })
        }
    }, [category, reset])

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

    const updateCategoryMutation = useUpdateAdminAmenityCategory()

    const onSuccessValidatedForm = (formData) => {
        updateCategoryMutation.mutate({
            id_amenity_category: category.id_amenity_category,
            payload: formData
        })
    }

    const onErrorValidatedForm = (errors) => {
        console.log("Validation errors:", errors)
    }

    return {
        formHookMethods,
        updateCategoryMutation,
        onSuccessValidatedForm,
        onErrorValidatedForm,
    }
}
