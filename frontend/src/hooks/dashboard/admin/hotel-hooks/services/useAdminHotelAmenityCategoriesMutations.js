import { useMutation, useQueryClient } from "@tanstack/react-query"

import { 
    createAdminAmenityCategory, 
    updateAdminAmenityCategory 
} from "../../../../../services/dashboard/admin/post-methods/adminHotelPostServices"

import { deleteAdminAmenityCategory } from "../../../../../services/dashboard/admin/delete-methods/adminHotelDeleteServices"

export function useCreateAdminAmenityCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload) => createAdminAmenityCategory(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminHotelAmenityCategories"] })
        },
    })
}

export function useUpdateAdminAmenityCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id_amenity_category, payload }) => updateAdminAmenityCategory(id_amenity_category, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminHotelAmenityCategories"] })
        },
    })
}

export function useDeleteAdminAmenityCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id_amenity_category) => deleteAdminAmenityCategory(id_amenity_category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminHotelAmenityCategories"] })
        },
    })
}