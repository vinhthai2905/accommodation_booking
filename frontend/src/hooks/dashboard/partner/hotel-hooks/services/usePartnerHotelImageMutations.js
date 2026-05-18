import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import {
    updatePartnerHotelImage,
    deletePartnerHotelImage,
    createPartnerHotelImage,
} from "../../../../../services/dashboard/partner/partnerHotelServices"

export function useEditHotelImage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id_hotel_image, payload }) => updatePartnerHotelImage(id_hotel_image, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partnerHotel"] })
            toast.success("Cập nhật hình ảnh thành công!")
        },
        onError: (error) => {
            const message = error.response?.data?.error || "Có lỗi xảy ra khi cập nhật hình ảnh"
            toast.error(message)
        },
    })
}

export function useDeleteHotelImage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id_hotel_image) => deletePartnerHotelImage(id_hotel_image),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partnerHotel"] })
            toast.success("Xóa hình ảnh thành công!")
        },
        onError: (error) => {
            const message = error.response?.data?.error || "Có lỗi xảy ra khi xóa hình ảnh"
            toast.error(message)
        },
    })
}

export function useCreateHotelImage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload) => createPartnerHotelImage(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partnerHotel"] })
            toast.success("Thêm hình ảnh thành công!")
        },
        onError: (error) => {
            const message = error.response?.data?.error || "Có lỗi xảy ra khi thêm hình ảnh"
            toast.error(message)
        },
    })
}
