import { clsx } from "clsx"

import HotelCardSearchResultItem from "../../components/search-result/HotelCardSearchResultItem"

export default function HotelCardSearchGrid({ hotelList }) {
    return (
        <div className="flex flex-col gap-4 w-full">
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