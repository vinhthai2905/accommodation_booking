import HotelCardMap from "../../search/components/search-result/HotelCardMap"
import HotelCardMapSkeleton from "../../search/components/loading/HotelCardMapSkeleton"

export default function HotelDisplayMapList({
    hotelListMap,
    selectedHotel,
    setSelectedHotel,
    isLoadingHotelsMap,
    errorLoadingHotelsMap
}) {
    return (
        <>
            {errorLoadingHotelsMap
                ? (
                    <div className="text-center py-10 text-red-500 text-sm font-medium">
                        Đã xảy ra lỗi khi tải chỗ nghỉ. Vui lòng thử lại sau.
                    </div>
                )
                : isLoadingHotelsMap
                    ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <HotelCardMapSkeleton key={index} />
                        ))
                    )
                    : hotelListMap && hotelListMap.length > 0 ? (
                        hotelListMap.map(hotel => (
                            <HotelCardMap
                                key={hotel.id_hotel}
                                hotel={hotel}
                                isSelectedHotel={selectedHotel?.id_hotel === hotel.id_hotel}
                                onMouseEnter={() => setSelectedHotel(hotel.id_hotel)}
                                onMouseLeave={() => setSelectedHotel(null)}
                            />
                        ))
                    )
                        : (
                            <div className="text-center py-10 text-slate-500 text-sm">
                                Không tìm thấy chỗ nghỉ nào.
                            </div>
                        )}
        </>
    )
}