import { useQuery } from "@tanstack/react-query"
import { 
    fetchPartnerHotelAmenities, 
    fetchPartnerHotelAmenitiesByCategory,
    fetchAvailableAmenities,
    fetchPartnerHotelCategoryDetail
} from "../../../../../services/dashboard/partner/get-methods/partnerHotelGetServices"

export function usePartnerHotelAmenities() {
    return useQuery({
        queryKey: ["partnerHotelAmenities"],
        queryFn: fetchPartnerHotelAmenities,
    })
}

export function usePartnerHotelAmenitiesByCategory(id_amenity_category) {
    return useQuery({
        queryKey: ["partnerHotelAmenities", id_amenity_category],
        queryFn: () => fetchPartnerHotelAmenitiesByCategory(id_amenity_category),
        enabled: !!id_amenity_category,
    })
}

export function useAvailableAmenities() {
    return useQuery({
        queryKey: ["availableAmenities"],
        queryFn: fetchAvailableAmenities,
    })
}

export function usePartnerHotelCategoryDetail(id_amenity_category) {
    return useQuery({
        queryKey: ["partnerHotelCategoryDetail", id_amenity_category],
        queryFn: () => fetchPartnerHotelCategoryDetail(id_amenity_category),
        enabled: !!id_amenity_category,
    })
}
