import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePartnerBookingStatus } from "../../../../../services/dashboard/partner/patch-methods/partnerBookingPatchServices"
import { toast } from "react-hot-toast"

export function usePartnerBookingStatusMutation() {
    const queryClient = useQueryClient()

    const updateStatusMutation = useMutation({
        mutationFn: updatePartnerBookingStatus,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["partnerBookings"] })
            queryClient.invalidateQueries({ queryKey: ["userBookings"] })
            toast.success("Cập nhật trạng thái thành công")
        },
        onError: (error) => {
            toast.error("Cập nhật trạng thái thất bại")
        }
    })

    return {
        updateStatusMutation
    }
}
