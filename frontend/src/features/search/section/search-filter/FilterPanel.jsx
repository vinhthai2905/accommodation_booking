import MapCard from "../../components/search-map/MapCard";
import { useSearchHotelAmenitiesCount } from "../../../../hooks/search/filter-hotels-hooks/useSearchHotelsFilterCount";

export default function FilterPanel() {
    const { isPending, error, data: amenities } = useSearchHotelAmenitiesCount()
    
    return (
        <div className="flex flex-col gap-1">
            <MapCard />
            <div>
                <div className="w-65 border border-gray-300 rounded-sm overflow-hidden text-sm">

                    <div className="p-4 border-b border-gray-300">
                        <h3 className="font-bold text-base text-gray-950">
                            Chọn lọc theo:
                        </h3>
                    </div>

                    <div className="p-4 border-b border-gray-300">
                        <p className="font-semibold mb-3 text-gray-900">Tiện nghi khách sạn</p>

                        {isPending 
                            ? (
                                 <div className="animate-pulse flex flex-col gap-3">
                                     {[...Array(6)].map((_, i) => (
                                         <div key={i} className="flex items-center gap-3">
                                             <div className="w-4 h-4 bg-gray-200 rounded-xs"></div>
                                             <div className="flex-1 h-3.5 bg-gray-200 rounded-xs"></div>
                                             <div className="w-6 h-3 bg-gray-200 rounded-xs"></div>
                                         </div>
                                     ))}
                                 </div>
                        )   : error 
                                ? (
                                    <p className="text-red-500 text-xs py-2">Không thể tải dữ liệu tiện nghi.</p>
                        ) 
                                : (
                                    <div className="flex flex-col gap-3">
                                        {amenities?.map((item) => (
                                            <label key={item.id_amenity_type} className="flex items-start gap-2 cursor-pointer text-gray-700 hover:text-black">
                                                <input type="checkbox" className="mt-1 shrink-0" />
                                                <span className="flex-1 leading-tight">{item.name}</span>
                                                <span className="text-gray-500 text-xs self-start mt-0.5 shrink-0">{item.hotel_count}</span>
                                            </label>
                                        ))}
                                    </div>
                        )}
                    </div>

                </div>
            </div>
            
        </div>
    )
}