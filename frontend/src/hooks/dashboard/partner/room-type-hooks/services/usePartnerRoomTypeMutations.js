import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  createPartnerRoomType,
  updatePartnerRoomType,
  deletePartnerRoomType,
  createPartnerPhysicalRoom,
  updatePartnerPhysicalRoom,
  deletePartnerPhysicalRoom
} from "../../../../../services/dashboard/partner/get-methods/partnerRoomTypeGetServices"

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

export function useCreatePhysicalRoomMutation(id_room_type) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => createPartnerPhysicalRoom(id_room_type, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partnerPhysicalRooms", id_room_type] })
    },
  })
}

export function useUpdatePhysicalRoomMutation(id_room_type) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id_room, payload }) => updatePartnerPhysicalRoom(id_room, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partnerPhysicalRooms", id_room_type] })
    },
  })
}

export function useDeletePhysicalRoomMutation(id_room_type) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id_room) => deletePartnerPhysicalRoom(id_room),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partnerPhysicalRooms", id_room_type] })
    },
  })
}
