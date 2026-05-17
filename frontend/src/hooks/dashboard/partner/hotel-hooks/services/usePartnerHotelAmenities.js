import { useQuery } from "@tanstack/react-query"
import { 
    fetchPartnerHotelAmenities, 
    fetchPartnerHotelAmenityCategories,
    fetchPartnerHotelAmenitiesByCategory,
    fetchAvailableAmenityTypes,
    fetchPartnerHotelCategoryDetail
} from "../../../../../services/dashboard/partner/partnerHotelServices"

export function usePartnerHotelAmenities() {
    return useQuery({
        queryKey: ["partnerHotelAmenities"],
        queryFn: fetchPartnerHotelAmenities,
    })
}

export function usePartnerHotelAmenityCategories() {
    return useQuery({
        queryKey: ["partnerHotelAmenityCategories"],
        queryFn: fetchPartnerHotelAmenityCategories,
    })
}

export function usePartnerHotelAmenitiesByCategory(id_amenity_category) {
    return useQuery({
        queryKey: ["partnerHotelAmenities", id_amenity_category],
        queryFn: () => fetchPartnerHotelAmenitiesByCategory(id_amenity_category),
        enabled: !!id_amenity_category,
    })
}

export function useAvailableAmenityTypes() {
    return useQuery({
        queryKey: ["availableAmenityTypes"],
        queryFn: fetchAvailableAmenityTypes,
    })
}

export function usePartnerHotelCategoryDetail(id_amenity_category) {
    return useQuery({
        queryKey: ["partnerHotelCategoryDetail", id_amenity_category],
        queryFn: () => fetchPartnerHotelCategoryDetail(id_amenity_category),
        enabled: !!id_amenity_category,
    })
}
