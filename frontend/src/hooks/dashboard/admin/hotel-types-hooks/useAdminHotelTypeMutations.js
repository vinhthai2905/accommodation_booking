import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAdminHotelType, updateAdminHotelType } from "../../../../services/dashboard/admin/post-methods/adminHotelTypePostServices"
import { deleteAdminHotelType } from "../../../../services/dashboard/admin/delete-methods/adminHotelTypeDeleteServices"

export const useCreateAdminHotelType = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createAdminHotelType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminHotelTypes"] })
        }
    })
}

export const useUpdateAdminHotelType = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }) => updateAdminHotelType(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminHotelTypes"] })
        }
    })
}

export const useDeleteAdminHotelType = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteAdminHotelType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminHotelTypes"] })
        }
    })
}
