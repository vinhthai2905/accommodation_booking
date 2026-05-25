import { useQuery } from "@tanstack/react-query"
import { fetchHotelRegistrationStatus } from "../../services/partner-onboarding/partnerOnboardingServices"

export function useRegistrationStatusPartnerOnboarding() {
    const { 
        data: registrationStatus, 
        isLoading: isLoadingRegistrationStatus,
        refetch: checkRegistrationStatus 
    } = useQuery({
        queryKey: ["registrationStatus"],
        queryFn: fetchHotelRegistrationStatus
    })

    return {
        registrationStatus,
        isLoadingRegistrationStatus,
        checkRegistrationStatus
    }
}