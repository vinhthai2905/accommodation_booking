import { useQuery } from "@tanstack/react-query"
import { fetchHotel } from "../../services/hotel/hotelServices"

import { UUID } from "../../types/common/common"
import { Hotel } from "../../types/hotels/hotel"

export default function useHotelInfo(hotelID: UUID) {
    return useQuery({
        queryKey: ["hotel", hotelID],
        queryFn: () => fetchHotel(hotelID),
        enabled: !!hotelID
    })
}
