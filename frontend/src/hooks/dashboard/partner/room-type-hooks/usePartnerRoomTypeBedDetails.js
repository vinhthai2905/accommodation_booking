import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import {
  fetchPartnerBeds,
  fetchPartnerRoomTypeBedDetails,
  createPartnerRoomTypeBedDetail,
  deletePartnerRoomTypeBedDetail,
} from "../../../../services/dashboard/partner/roomTypeDetailServices"

export function usePartnerBeds({successLoadedRoomTypeDetails}) {
  return useQuery({
    queryKey: ["partnerBeds"],
    queryFn: fetchPartnerBeds,
    staleTime: 5 * 60 * 1000,
    // enabled: !!successLoadedRoomTypeDetails
  })
}

export function usePartnerRoomTypeBedDetails(id_room_type) {
  return useQuery({
    queryKey: ["partnerRoomTypeBedDetails", id_room_type],
    queryFn: () => fetchPartnerRoomTypeBedDetails(id_room_type),
    enabled: !!id_room_type,
  })
}

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
