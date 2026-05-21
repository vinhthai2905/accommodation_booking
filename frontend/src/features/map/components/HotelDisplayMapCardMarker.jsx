import HotelCardMapSummary from "../../search/components/search-result/HotelCardMapSummary"
import HotelCardMapPriceSummary from "../../search/components/search-result/HotelCardMapPriceSummary"

import { clsx } from "clsx"
import { Building } from "lucide-react"
import { Link, useLocation } from "react-router"
import { useEffect, useRef } from "react"
import { useMap } from "react-leaflet"

import useAnalyzeGuestParams from "../../../hooks/search/hotel-detail-search-hooks/useAnalyzeGuestParams"
import useAdjustHotelAppealingPrice from "../../../hooks/search/hotel-detail-search-hooks/useAdjustHotelAppealingPrice"
import useAnalyzeHotelRatings from "../../../hooks/search/hotel-detail-search-hooks/useAnalyzeHotelRatings"

export default function HotelDisplayMapCardMarker({ hotel, isSelectedHotel, onClose, onClick }) {
    const map = useMap()

    const handleClose = () => {
        if (onClose) onClose()
        map.closePopup()
    }
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
            onClick={onClick}
            className={clsx(
                "absolute flex w-95 h-55 overflow-hidden cursor-pointer shrink-0 top-2",
                "bg-white shadow-sm hover:shadow-md rounded-lg border",
                "transition-all duration-300",
                isSelectedHotel ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/3" : "border-slate-200"
            )}
        >
            <div className="relative w-32 shrink-0 bg-slate-50 overflow-hidden">
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

            <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                <HotelCardMapSummary
                    hotel={hotel}
                    onClose={handleClose}
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
