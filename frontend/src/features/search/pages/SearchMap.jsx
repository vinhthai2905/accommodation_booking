import HotelCardMap from "../components/search-result/HotelCardMap"
import HotelsDisplayMap from "../../map/section/HotelsDisplayMap"

import { clsx } from "clsx"
import { useState } from "react"

export default function SearchMap({ onClose, hotelListMap }) {
    const [selectedHotel, setSelectedHotel] = useState(null)

    return (
        <div className={clsx(
            "relative h-screen w-full overflow-hidden",
            "flex",
            "border-t border-gray-200 bg-gray-50",
            "text-black"
        )}>
            <aside className={clsx(
                "z-1000 h-full w-102.5 overflow-hidden shrink-0 bg-white",
                "border-r border-gray-200",
                "shadow-[4px_0_10px_rgba(0,0,0,0.05)]",
                "flex flex-col"
            )}>
                <div className="p-4 md:p-5 border-b border-slate-100 flex items-center shrink-0">
                    <h2 className="text-sm md:text-base lg:text-lg font-extrabold text-slate-800">
                        Đà Nẵng: {hotelListMap?.length || 0} chỗ nghỉ
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-5 flex flex-col gap-4">
                    {hotelListMap && hotelListMap.length > 0 ? (
                        hotelListMap.map(hotel => (
                            <HotelCardMap 
                                key={hotel.id_hotel}
                                hotel={hotel} 
                                isSelectedHotel={selectedHotel?.id_hotel === hotel.id_hotel}
                                onMouseEnter={() => setSelectedHotel(hotel.id_hotel)}
                                onMouseLeave={() => setSelectedHotel(null)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 text-slate-500 text-sm">
                            Không tìm thấy chỗ nghỉ nào.
                        </div>
                    )}
                </div>
            </aside>

            <HotelsDisplayMap
                hotelListMap={hotelListMap}
                selectedHotel={selectedHotel}
                setSelectedHotel={setSelectedHotel}
                onClose={onClose}
            />
        </div>
    )
}