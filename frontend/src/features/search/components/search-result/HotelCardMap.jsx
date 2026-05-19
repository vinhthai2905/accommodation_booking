import HotelCardMapSummary from "./HotelCardMapSummary"
import HotelCardMapPriceSummary from "./HotelCardMapPriceSummary"

import { clsx } from "clsx"
import { Building } from "lucide-react"
import { Link, useLocation } from "react-router"
import { useEffect, useRef } from "react"

import useAnalyzeGuestParams from "../../../../hooks/search/useAnalyzeGuestParams"
import useAdjustHotelAppealingPrice from "../../../../hooks/search/useAdjustHotelAppealingPrice"
import useAnalyzeHotelRatings from "../../../../hooks/search/useAnalyzeHotelRatings"

export default function HotelCardMap({ hotel, onClose, isSelectedHotel, onMouseEnter, onMouseLeave }) {
    const { nights, children, adults } = useAnalyzeGuestParams()
    const { totalCurrentPrice, totalOriginalPrice } = useAdjustHotelAppealingPrice(hotel, nights)
    const { ratingLabel, ratingScore, reviewsCount } = useAnalyzeHotelRatings(hotel)

    const location = useLocation()
    const cardRef = useRef(null)

    useEffect(() => {
        if (isSelectedHotel && cardRef.current) {
            cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }
    }, [isSelectedHotel])


    return (
        <div
            ref={cardRef}
            onMouseEnter={() => onMouseEnter()}
            onMouseLeave={() => onMouseLeave()}
            className={clsx(
                "relative flex w-full h-60 overflow-hidden  cursor-pointer shrink-0",
                "bg-white shadow-sm hover:shadow-md rounded-lg border",
                "transition-all duration-300",
                isSelectedHotel ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/3" : "border-slate-200"
            )}
        >
            <div className="relative w-36 shrink-0 bg-slate-50 overflow-hidden">
                <Link to={`/hotel/${hotel.slug}/${hotel.id_hotel}${location.search}`} className="block h-full w-full">
                    {hotel.primary_image ? (
                        <img
                            src={hotel.primary_image}
                            alt={hotel.name}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-300">
                            <Building size={36} />
                        </div>
                    )}
                </Link>
            </div>

            <div className="flex-1 p-3.5 flex flex-col justify-between min-w-0">
                <HotelCardMapSummary
                    hotel={hotel}
                    onClose={onClose}
                    ratingLabel={ratingLabel}
                    reviewsCount={reviewsCount}
                    ratingScore={ratingScore}
                />

                <HotelCardMapPriceSummary
                    nights={nights}
                    adults={adults}
                    children={children}
                    totalCurrentPrice={totalCurrentPrice}
                    totalOriginalPrice={totalOriginalPrice}
                />
            </div>
        </div>
    )
}
