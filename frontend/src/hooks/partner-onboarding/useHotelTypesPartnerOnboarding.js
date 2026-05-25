import { useQuery } from "@tanstack/react-query"
import { fetchHotelTypes } from "../../services/partner-onboarding/partnerOnboardingServices"


export function useHotelTypesPartnerOnboarding() {
    const { data: hotelTypes = [], isLoading } = useQuery({
        queryKey: ["hotelTypes"],
        queryFn: fetchHotelTypes
    })

    return {
        hotelTypes,
        loading: isLoading
    }
}