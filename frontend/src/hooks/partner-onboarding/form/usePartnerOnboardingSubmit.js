import toast from "react-hot-toast"

import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"

import { submitHotelRegistration } from "../../../services/partner-onboarding/partnerOnboardingServices"

export function usePartnerOnboardingSubmit(checkRegistrationStatus) {
    const navigate = useNavigate()

    const { mutateAsync: handleSubmitHotelRegistration, isPending: submittingHotelRegistration } = useMutation({
        mutationFn: async (formData) => {
            let payload
            if (formData.document_file) {
                payload = new FormData()
                payload.append("hotel_name", formData.hotel_name)
                payload.append("id_hotel_type", parseInt(formData.id_hotel_type))
                payload.append("phone_number", formData.phone_number)
                payload.append("id_ward", parseInt(formData.id_ward))
                payload.append("address", formData.address)
                if (formData.latitude) payload.append("latitude", formData.latitude)
                if (formData.longitude) payload.append("longitude", formData.longitude)
                payload.append("document_name", formData.document_name)
                payload.append("document_file", formData.document_file)
                if (formData.document_url) {
                    payload.append("document_url", formData.document_url)
                }
            } else {
                payload = {
                    hotel_name: formData.hotel_name,
                    id_hotel_type: parseInt(formData.id_hotel_type),
                    phone_number: formData.phone_number,
                    id_ward: parseInt(formData.id_ward),
                    address: formData.address,
                    latitude: formData.latitude,
                    longitude: formData.longitude,
                    document_name: formData.document_name,
                    document_url: formData.document_url
                }
            }
            return await submitHotelRegistration(payload)
        },
        onSuccess: async () => {
            toast.success("Gửi đơn đăng ký chỗ nghỉ thành công!")
            await checkRegistrationStatus()
        },
        onError: (err) => {
            console.error(err)
            let errorMsg = "Gửi đơn đăng ký thất bại."
            try {
                const parsed = JSON.parse(err.message)
                const firstError = Object.values(parsed)[0]
                if (firstError) errorMsg = Array.isArray(firstError) ? firstError[0] : firstError
            } catch (parseError) {
                console.warn("Could not parse error message", parseError)
            }
            toast.error(errorMsg)
        }
    })

    return {
        navigate,
        submittingHotelRegistration,
        handleSubmitHotelRegistration
    }
}
