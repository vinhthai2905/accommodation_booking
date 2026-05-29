import { useQuery } from "@tanstack/react-query"

import { fetchAdminHotelAmenityCategories } from "../../../../../services/dashboard/admin/get-methods/adminHotelGetServices"

export function useAdminHotelAmenityCategories() {
    return useQuery({
        queryKey: ["adminHotelAmenityCategories"],
        queryFn: fetchAdminHotelAmenityCategories,
    })
}