import { clsx } from "clsx"

import HotelCardSearchResultItem from "../../hotels/HotelCardSearchResultItem"
import BaseMap from "../../map/components/BaseMap"

export default function SearchMap({ onClose, hotelList }) {
    return (
        <div className={clsx(
            "relative h-screen w-full overflow-hidden",
            "flex",
            "border-t border-gray-200 bg-gray-50",
            "text-black"
        )}>
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
                    {hotelList.map((hotel) => {
                        return <HotelCardSearchResultItem key={hotel.id_hotel} hotel={hotel}/>
                    })}
                </div>
            </aside>

            {/* Right side Map */}
            <BaseMap
                onClose={onClose}
            />
        </div>
    )
}