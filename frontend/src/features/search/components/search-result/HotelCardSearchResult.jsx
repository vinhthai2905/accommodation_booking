import HotelCardSummary from "./HotelCardSummary"
import HotelCardSummaryPrice from "./HotelCardSummaryPrice"

import { clsx } from "clsx"
import { useLocation } from "react-router"

export default function HotelCardSearchResult({ hotel }) {
    const location = useLocation()

    const originalPrice = hotel.appealing_price ? Math.round(hotel.appealing_price * 1.25) : 0

    return (
        <div
            identity="hotel-card-search-result-item"
            className={clsx(
                "w-full overflow-hidden rounded-lg",
                "flex flex-col md:flex-row",
                "border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            )}>

                <HotelCardSummary 
                    hotel={hotel}
                />

                <HotelCardSummaryPrice
                    hotel={hotel}
                    originalPrice={originalPrice}
                />
        </div>
    )
}