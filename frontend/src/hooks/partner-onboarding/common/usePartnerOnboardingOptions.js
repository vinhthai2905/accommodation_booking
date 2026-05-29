import { usePartnerOnboardingWards } from "../services/usePartnerOnboardingWards"
import { usePartnerOnboardingHotelTypes } from "../services/usePartnerOnboardingHotelTypes"

export function usePartnerOnboardingOptions() {
    const { hotelTypes, loading: loadingHotelTypes } = usePartnerOnboardingHotelTypes()
    const { wards, loading: loadingWards } = usePartnerOnboardingWards()

    const loadingOptions = loadingHotelTypes || loadingWards

    return {
        hotelTypes,
        wards,
        loadingOptions
    }
}
