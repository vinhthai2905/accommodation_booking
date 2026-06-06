import { useQuery } from "@tanstack/react-query";
import { fetchPartnerStatistics } from "../../../../../services/dashboard/partner/get-methods/partnerStatisticsGetServices";

export function usePartnerStatistics(timeFilter) {
    return useQuery({
        queryKey: ["partnerStatistics", timeFilter],
        queryFn: () => fetchPartnerStatistics(timeFilter),
        keepPreviousData: true,
    });
}
