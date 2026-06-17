import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePartnerRefundPolicy } from "../../../../../services/dashboard/partner/get-methods/partnerHotelGetServices"
import { toast } from "react-hot-toast"

export const usePartnerRefundPolicyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => updatePartnerRefundPolicy(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["partnerRefundPolicy"])
      toast.success("Cập nhật chính sách hoàn tiền thành công")
    },
    onError: (err) => {
      console.error(err)
      toast.error("Đã xảy ra lỗi khi cập nhật chính sách")
    },
  })
}
