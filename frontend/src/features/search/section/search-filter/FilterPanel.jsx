import MapCard from "../../components/search-map/MapCard";
import { useSearchHotelAmenitiesCount } from "../../../../hooks/search/filter-hotels-hooks/useSearchHotelsFilterCount";

export default function FilterPanel() {
    const { isPending, error, data: amenitiesData } = useSearchHotelAmenitiesCount();

    return (
        <div className="flex flex-col gap-1">
            <MapCard />
            <div>
                <div className="w-65 border border-gray-300 rounded-sm overflow-hidden text-sm">

                    {/* Header */}
                    <div className="p-4 border-b border-gray-300">
                        <h3 className="font-bold text-base text-gray-950">
                            Chọn lọc theo:
                        </h3>
                    </div>

                    {/* Section 1 */}
                    <div className="p-4 border-b border-gray-300">
                        <p className="font-semibold mb-3 text-gray-900">Tiện nghi khách sạn</p>

                        <div className="flex flex-col gap-3">
                            {isPending && <p className="text-gray-500 text-xs">Đang tải...</p>}
                            {error && <p className="text-red-500 text-xs">Có lỗi xảy ra khi tải tiện nghi</p>}
                            {!isPending && !error && amenitiesData && amenitiesData.map((item) => (
                                <label key={item.id_amenity_type} className="flex items-start gap-2 cursor-pointer text-gray-700 hover:text-black">
                                    <input type="checkbox" className="mt-1 shrink-0" />
                                    <span className="flex-1 leading-tight">{item.name}</span>
                                    <span className="text-gray-500 text-xs self-start mt-0.5 shrink-0">{item.hotel_count}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}