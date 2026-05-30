import { useQuery } from "@tanstack/react-query"
import { fetchWards } from "../../../services/location/locationServices"

export function usePartnerOnboardingWards() {
    const { data: wards = [], isLoading } = useQuery({
        queryKey: ["wards"],
        queryFn: fetchWards
    })

    return {
        wards,
        loading: isLoading
    }
}