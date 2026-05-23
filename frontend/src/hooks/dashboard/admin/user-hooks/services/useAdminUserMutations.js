import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAdminUser, updateAdminUser } from "../../../../../services/dashboard/admin/post-methods/adminUserPostServices"
import { deleteAdminUser } from "../../../../../services/dashboard/admin/delete-methods/adminUserDeleteServices"

export function useCreateAdminUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload) => createAdminUser(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminUsers"] })
        },
    })
}

export function useUpdateAdminUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id_user, payload }) => updateAdminUser(id_user, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminUsers"] })
        },
    })
}

export function useDeleteAdminUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id_user) => deleteAdminUser(id_user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminUsers"] })
        },
    })
}
