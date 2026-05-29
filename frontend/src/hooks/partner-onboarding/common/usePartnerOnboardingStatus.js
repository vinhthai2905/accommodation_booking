import { useEffect } from "react"
import toast from "react-hot-toast"
import { usePartnerOnboarding } from "../services/usePartnerOnboarding"

export function usePartnerOnboardingStatus(methods) {
    const { reset } = methods

    const { 
        partnerRegistration, 
        isLoadingPartnerRegistration,
        checkRegistrationStatus 
    } = usePartnerOnboarding()

    const loadingStatus = isLoadingPartnerRegistration

    useEffect(() => {
        if (!partnerRegistration) return

        if (partnerRegistration.status === "Đã duyệt") {
            toast.success("Đơn đăng ký của bạn đã được duyệt!")
            setTimeout(() => {
                window.location.href = "/partner/dashboard"
            }, 1000)
            return 

        } else if (partnerRegistration.status === "Từ chối") {
            reset({
                hotel_name: partnerRegistration.hotel_name || "",
                id_hotel_type: partnerRegistration.id_hotel_type?.toString() || "",
                phone_number: partnerRegistration.phone_number || "",
                id_ward: partnerRegistration.id_ward?.toString() || "",
                address: partnerRegistration.address || "",
                document_name: partnerRegistration.document_name || "Giấy phép kinh doanh",
                document_url: partnerRegistration.document_url || "",
                document_file: null
            })
        }
    }, [partnerRegistration, reset])

    return {
        registration: partnerRegistration,
        loadingStatus,
        checkRegistrationStatus
    }
}
