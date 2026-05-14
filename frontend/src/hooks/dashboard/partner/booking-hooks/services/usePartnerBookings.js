import { useQuery } from "@tanstack/react-query"

import { getPartnerBookings } from "../../../../../services/dashboard/partner/partnerBookingServices"

export function usePartnerBookings(currentTab) {
    return useQuery({
        queryKey: ["partnerBookings", currentTab],
        queryFn: () => getPartnerBookings(currentTab),
        enabled: !!currentTab,
    })
}