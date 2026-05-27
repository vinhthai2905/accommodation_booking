import { useEffect } from "react"
import toast from "react-hot-toast"
import { useRegistrationStatusPartnerOnboarding } from "./useRegistrationStatusPartnerOnboarding"
import { useWardsPartnerOnboarding } from "./useWardsPartnerOnboarding"
import { useHotelTypesPartnerOnboarding } from "./useHotelTypesPartnerOnboarding"

export function useOnboardingStatus(methods) {
    const { reset } = methods

    const { hotelTypes, loading: loadingHotelTypes } = useHotelTypesPartnerOnboarding()
    const {wards: wardsData, loading: loadingWards} = useWardsPartnerOnboarding()

    const { 
        registrationStatus, 
        isLoadingRegistrationStatus,
        checkRegistrationStatus 
    } = useRegistrationStatusPartnerOnboarding()

    const loadingData = loadingHotelTypes || loadingWards || isLoadingRegistrationStatus
    const loadingStatus = isLoadingRegistrationStatus

    useEffect(() => {
        if (!registrationStatus) return

        if (registrationStatus.status === "Đã duyệt") {
            toast.success("Đơn đăng ký của bạn đã được duyệt!")
            setTimeout(() => {
                window.location.href = "/partner/dashboard"
            }, 1000)
        } else if (registrationStatus.status === "Từ chối") {
            reset({
                hotel_name: registrationStatus.hotel_name || "",
                id_hotel_type: registrationStatus.id_hotel_type?.toString() || "",
                phone_number: registrationStatus.phone_number || "",
                id_ward: registrationStatus.id_ward?.toString() || "",
                address: registrationStatus.address || "",
                document_name: registrationStatus.document_name || "Giấy phép kinh doanh",
                document_url: registrationStatus.document_url || "",
                document_file: null
            })
        }
    }, [registrationStatus, reset])

    return {
        hotelTypes,
        wards: wardsData,
        loadingData,
        registration: registrationStatus,
        loadingStatus,
        checkRegistrationStatus
    }
}
