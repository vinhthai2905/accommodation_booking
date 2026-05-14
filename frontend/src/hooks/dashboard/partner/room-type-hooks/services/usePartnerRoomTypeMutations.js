import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  createPartnerRoomType,
  updatePartnerRoomType,
  deletePartnerRoomType
} from "../../../../../services/dashboard/partner/partnerRoomTypeServices"

export function useCreateRoomTypeMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => createPartnerRoomType(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partnerRoomTypes"] })
    }
  })
}

export function useUpdateRoomTypeMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id_room_type, payload }) =>
      updatePartnerRoomType(id_room_type, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partnerRoomTypes"] })
    },
  })
}

export function useDeleteRoomTypeMutation(id_room_type, setIsDeleteModalOpen) {
  const queryClient = useQueryClient()

  const deleteRoomTypeMutation = useMutation({
    mutationFn: (id_room_type) => deletePartnerRoomType(id_room_type),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partnerRoomTypes"] })
    },
  })

  const handleDeleteRoomType = () => {
      deleteRoomTypeMutation.mutate(id_room_type)
      setIsDeleteModalOpen(false)
  }

  return handleDeleteRoomType
}
