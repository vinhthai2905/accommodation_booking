
import HotelCardSearchResult from "../../components/search-result/HotelCardSearchResult"

export default function HotelCardSearchGrid({ hotelList }) {
    return (
        <div className="flex flex-col gap-4 w-full">
            {hotelList.map(hotel => {
                return (
                    <HotelCardSearchResult 
                        key={hotel.id_hotel} 
                        hotel={hotel}
                    />
                )
            })}
        </div>
    )
}