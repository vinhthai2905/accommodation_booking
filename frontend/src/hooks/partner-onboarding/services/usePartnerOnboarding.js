import { useQuery } from "@tanstack/react-query"
import { fetchHotelRegistrationStatus } from "../../../services/partner-onboarding/partnerOnboardingServices"

export function usePartnerOnboarding() {
    const { 
        data: partnerRegistration, 
        isPending: isLoadingPartnerRegistration,
        refetch: checkRegistrationStatus 
    } = useQuery({
        queryKey: ["partnerRegistration"],
        queryFn: fetchHotelRegistrationStatus,
    })

    return {
        partnerRegistration,
        isLoadingPartnerRegistration,
        checkRegistrationStatus
    }
}