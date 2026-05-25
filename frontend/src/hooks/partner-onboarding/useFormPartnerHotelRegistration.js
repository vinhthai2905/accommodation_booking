import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export function useFormPartnerHotelRegistration() {
    const methods = useForm({
        defaultValues: {
            hotel_name: "",
            id_hotel_type: "",
            phone_number: "",
            id_ward: "",
            address: "",
            latitude: null,
            longitude: null,
            document_name: "Giấy phép kinh doanh",
            document_url: "",
            document_file: null
        }
    })

    const { setValue } = methods

    const handleFileUploadSimulate = () => {
        const simulatedUrl = `/media/documents/${Date.now()}_document.pdf`
        setValue("document_url", simulatedUrl, { shouldValidate: true })
        setValue("document_file", null, { shouldValidate: true })
        toast.success("Tải lên tài liệu mẫu thành công!")
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setValue("document_file", file, { shouldValidate: true })
            setValue("document_url", "", { shouldValidate: true })
            toast.success(`Đã chọn tệp: ${file.name}`)
        }
    }

    return {
        methods,
        handleFileUploadSimulate,
        handleFileChange
    }
}