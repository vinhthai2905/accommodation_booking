import HotelDisplayMapMarkers from "../../map/section/HotelDisplayMapMarkers"

import { clsx } from "clsx"
import { useState } from "react"
import HotelDisplayMapList from "../../map/section/HotelDisplayMapList"

export default function SearchMap({ 
    onClose, 
    hotelListMap, 
    handleMapViewPortChange,
    isLoadingHotelsMap,
    errorLoadingHotelsMap
}) {
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
                    <h2 className="text-sm md:text-base lg:text-lg font-extrabold text-slate-800 h-7 flex items-center">
                        {isLoadingHotelsMap ? (
                            <span className="inline-block h-5 bg-slate-200 rounded w-40 animate-pulse" />
                        ) : (
                            `Đà Nẵng: ${hotelListMap?.length || 0} chỗ nghỉ`
                        )}
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-5 flex flex-col gap-4">
                   <HotelDisplayMapList 
                        hotelListMap={hotelListMap}
                        selectedHotel={selectedHotel}
                        setSelectedHotel={setSelectedHotel}
                        isLoadingHotelsMap={isLoadingHotelsMap}
                        errorLoadingHotelsMap={errorLoadingHotelsMap}
                   />
                </div>
            </aside>

            <HotelDisplayMapMarkers
                hotelListMap={hotelListMap}
                selectedHotel={selectedHotel}
                setSelectedHotel={setSelectedHotel}
                handleMapViewPortChange={handleMapViewPortChange}
                onClose={onClose}
            />
        </div>
    )
}