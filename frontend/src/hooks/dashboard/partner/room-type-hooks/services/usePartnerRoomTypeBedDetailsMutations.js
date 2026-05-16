import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  createPartnerRoomTypeBedDetail,
  deletePartnerRoomTypeBedDetail,
} from "../../../../../services/dashboard/partner/partnerRoomTypeDetailServices"


export function useCreateRoomTypeBedDetail(id_room_type) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => createPartnerRoomTypeBedDetail(id_room_type, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partnerRoomTypeBedDetails", id_room_type] })
    },
  })
}

export function useDeleteRoomTypeBedDetail(id_room_type) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id_room_type_detail) =>
      deletePartnerRoomTypeBedDetail({ id_room_type, id_room_type_detail }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partnerRoomTypeBedDetails", id_room_type] })
    },
  })
}
