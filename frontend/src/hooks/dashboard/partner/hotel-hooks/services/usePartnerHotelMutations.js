import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  updatePartnerHotel
} from "../../../../../services/dashboard/partner/post-methods/partnerHotelPostServices"

export function useUpdatePartnerHotelMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => updatePartnerHotel(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partnerHotel"] })
    },
  })
}
