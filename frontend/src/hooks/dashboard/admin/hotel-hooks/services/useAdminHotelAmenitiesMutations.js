import { useMutation, useQueryClient } from "@tanstack/react-query"

import { 
    createAdminAmenity, 
    updateAdminAmenity 
} from "../../../../../services/dashboard/admin/post-methods/adminHotelPostServices"

import { deleteAdminAmenity } from "../../../../../services/dashboard/admin/delete-methods/adminHotelDeleteServices"

export function useCreateAdminAmenity() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload) => createAdminAmenity(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["availableAmenities"] })
        },
    })
}

export function useUpdateAdminAmenity() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id_amenity_type, payload }) => updateAdminAmenity(id_amenity_type, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["availableAmenities"] })
        },
    })
}

export function useDeleteAdminAmenity() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id_amenity_type) => deleteAdminAmenity(id_amenity_type),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["availableAmenities"] })
        },
    })
}
