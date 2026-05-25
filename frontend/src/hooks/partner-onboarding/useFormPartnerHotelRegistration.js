import { useState } from "react"

export function useFormPartnerHotelRegistration() {
    const [formData, setFormData] = useState({
        hotel_name: "",
        id_hotel_type: "",
        phone_number: "",
        id_ward: "",
        address: "",
        document_name: "Giấy phép kinh doanh",
        document_url: "",
        document_file: null
    })


    return {
        formData,
        setFormData
    }
}