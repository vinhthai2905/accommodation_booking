import { clsx } from "clsx"

import HotelCardSearchResultItem from "../components/HotelCardSearchResultItem"

export default function HotelCardSearchGrid({ hotelList }) {
    return (
        <div className={clsx(
            "grid grid-cols-3 gap-2 auto-rows-auto"
        )}>
            {hotelList.map(hotel => {
                return (
                    <HotelCardSearchResultItem 
                        key={hotel.id_hotel} 
                        hotel={hotel}
                    />
                )
            })}
        </div>
    )
}