import { useQuery } from "@tanstack/react-query"

import { fetchPartnerBookings } from "../../../../../services/dashboard/partner/get-methods/partnerBookingGetServices"

export function usePartnerBookings(currentTab) {
    return useQuery({
        queryKey: ["partnerBookings", currentTab],
        queryFn: () => fetchPartnerBookings(currentTab),
        enabled: !!currentTab,
    })
}