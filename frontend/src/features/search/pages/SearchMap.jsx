import { clsx } from "clsx"

import HotelDisplayMapCard from "../../map/components/HotelDisplayMapCard"
import HotelsDisplayMap from "../../map/section/HotelsDisplayMap"

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
            {
                selectedHotel && (
                    <aside className={clsx(
                        "z-1000 h-full w-full md:w-[40%] xl:w-[35%] overflow-y-auto",
                        "flex flex-col gap-4",
                        "p-4 md:p-6",
                        "border-r border-gray-200 bg-white",
                        "shadow-[4px_0_10px_rgba(0,0,0,0.05)]"
                    )}>
                        <div className={clsx(
                            "flex flex-col gap-6",
                            "pb-8 pt-2"
                        )}>
                            <HotelDisplayMapCard 
                                hotel={selectedHotel} 
                                onClose={() => setSelectedHotel(null)} 
                            />
                        </div>
                    </aside>
                )
            }
            <HotelsDisplayMap
                hotelListMap={hotelListMap}
                setSelectedHotel={setSelectedHotel}
                onClose={onClose}
            />
        </div>
    )
}