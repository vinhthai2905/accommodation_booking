import { useState } from "react"

import {
    useCreatePartnerHotelAmenity,
    useDeletePartnerHotelAmenity
} from "../../hotel-hooks/services/usePartnerHotelAmenityMutations"

export function useCRUDMutation(currentAmenitiesMap) {
    const [mutatingAmenityID, setMutatingAmenityID] = useState(new Set())

    const { mutate: createHotelAmenityMutation } = useCreatePartnerHotelAmenity()
    const { mutate: deleteHotelAmenityMutation } = useDeletePartnerHotelAmenity()

    const handleToggleAmenityMutation = (amenityType) => {
        const typeId = amenityType.id_amenity_type
        if (mutatingAmenityID.has(typeId)) return // Prevent duplicate clicks during request

        // Add to local mutating state
        setMutatingAmenityID(prev => {
            const next = new Set(prev)
            next.add(typeId)
            return next
        })

        const selectedAmenityID = currentAmenitiesMap.get(typeId)

        if (selectedAmenityID) {
            // If already exists, we remove it
            deleteHotelAmenityMutation(selectedAmenityID, {
                onSuccess: () => {
                    setMutatingAmenityID(prev => {
                        const next = new Set(prev)
                        next.delete(typeId)
                        return next
                    })
                },
                onError: () => {
                    setMutatingAmenityID(prev => {
                        const next = new Set(prev)
                        next.delete(typeId)
                        return next
                    })
                }
            })
        } else {
            // Otherwise, we add it
            createHotelAmenityMutation({ id_amenity_type: typeId }, {
                onSuccess: () => {
                    setMutatingAmenityID(prev => {
                        const next = new Set(prev)
                        next.delete(typeId)
                        return next
                    })
                },
                onError: () => {
                    setMutatingAmenityID(prev => {
                        const next = new Set(prev)
                        next.delete(typeId)
                        return next
                    })
                }
            })
        }
    }

    return {
        handleToggleAmenityMutation,
        mutatingAmenityID
    }

}