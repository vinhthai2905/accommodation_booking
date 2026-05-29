import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePartnerChildrenPolicy } from "../../../../../services/dashboard/partner/get-methods/partnerHotelGetServices"
import { toast } from "react-hot-toast"

export const usePartnerChildrenPolicyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => updatePartnerChildrenPolicy(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["partnerChildrenPolicy"])
      toast.success("Cập nhật chính sách trẻ em thành công")
    },
    onError: (err) => {
      console.error(err)
      toast.error("Đã xảy ra lỗi khi cập nhật chính sách")
    },
  })
}
