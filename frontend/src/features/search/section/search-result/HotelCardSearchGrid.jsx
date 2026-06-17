
import HotelCardSearchResult from "../../components/search-result/HotelCardSearchResult"

export default function HotelCardSearchGrid({ paginateHotelsList }) {
    return (
        <div className="flex flex-col gap-4 w-full">
            {paginateHotelsList.map(hotel => {
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