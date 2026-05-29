import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAdminWard, updateAdminWard } from "../../../../../services/dashboard/admin/post-methods/adminLocationPostServices"
import { deleteAdminWard } from "../../../../../services/dashboard/admin/delete-methods/adminLocationDeleteServices"

export function useCreateAdminWard() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload) => createAdminWard(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminWards"] })
        },
    })
}

export function useUpdateAdminWard() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id_ward, payload }) => updateAdminWard(id_ward, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminWards"] })
        },
    })
}

export function useDeleteAdminWard() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id_ward) => deleteAdminWard(id_ward),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminWards"] })
        },
    })
}
