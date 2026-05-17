import { useMutation, useQueryClient } from "@tanstack/react-query"
import { 
    createPartnerHotelAmenity, 
    deletePartnerHotelAmenity,
    createPartnerHotelCategory,
    updatePartnerHotelCategory,
    deletePartnerHotelCategory
} from "../../../../../services/dashboard/partner/partnerHotelServices"

export function useCreatePartnerHotelCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload) => createPartnerHotelCategory(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partnerHotelAmenityCategories"] })
        },
    })
}

export function useUpdatePartnerHotelCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id_amenity_category, payload }) => updatePartnerHotelCategory(id_amenity_category, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partnerHotelAmenityCategories"] })
        },
    })
}

export function useDeletePartnerHotelCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id_amenity_category) => deletePartnerHotelCategory(id_amenity_category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partnerHotelAmenityCategories"] })
        },
    })
}

export function useCreatePartnerHotelAmenity() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload) => createPartnerHotelAmenity(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partnerHotelAmenities"] })
        },
    })
}

export function useDeletePartnerHotelAmenity() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id_hotel_amenity) => deletePartnerHotelAmenity(id_hotel_amenity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partnerHotelAmenities"] })
        },
    })
}
