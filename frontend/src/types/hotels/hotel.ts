import { UUID } from "../common/common"

interface HotelImages {
    id_hotel_image: number,
    image_name: string,
    is_primary: boolean,
    url: string
}

export interface Hotel {
    id_hotel: UUID,
    id_hotel_type: number,
    id_ward: number,
    slug: string,
    name: string,
    full_address: string,
    hotel_images: Array<HotelImages>
}