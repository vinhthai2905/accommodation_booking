import { useMutation, useQueryClient } from "@tanstack/react-query"
import { 
    deletePartnerHotelAmenity,
} from "../../../../../services/dashboard/partner/delete-methods/partnerHotelDeleteServices"


import { 
    createPartnerHotelAmenity, 
} from "../../../../../services/dashboard/partner/post-methods/partnerHotelPostServices"


export function useCreatePartnerHotelAmenity() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload) => createPartnerHotelAmenity(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partnerHotelAmenities"] })
        },
    })
}

export function useDeletePartnerHotelAmenity() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id_hotel_amenity) => deletePartnerHotelAmenity(id_hotel_amenity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partnerHotelAmenities"] })
        },
    })
}
