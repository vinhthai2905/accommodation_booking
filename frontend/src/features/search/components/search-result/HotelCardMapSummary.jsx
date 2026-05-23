import { clsx } from "clsx"
import { Link, useLocation } from "react-router"
import { Heart, X, Star } from "lucide-react"

export default function HotelCardMapSummary({hotel, onClose, ratingLabel, reviewsCount, ratingScore}) {
    const location = useLocation()

    return (
        <div>
            <div className="flex justify-between items-start gap-2.5">
                <Link
                    to={`/hotel/${hotel.slug}/${hotel.id_hotel}${location.search}`}
                    className={clsx(
                        "text-1.0rem font-extrabold text-[#003b95] leading-tight ",
                        "hover:text-blue-800 hover:underline line-clamp-2"
                    )}
                >
                    {hotel.name}
                </Link>
                <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                    <button
                        type="button"
                        className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer p-0.5"
                        aria-label="Yêu thích"
                    >
                        <Heart size={16} />
                    </button>
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-0.5"
                            aria-label="Đóng"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                <div className="flex items-center text-amber-400">
                    <Star size={12} fill="currentColor" className="stroke-none" />
                    <Star size={12} fill="currentColor" className="stroke-none" />
                    <Star size={12} fill="currentColor" className="stroke-none" />
                    <Star size={12} fill="currentColor" className="stroke-none" />
                    <Star size={12} fill="currentColor" className="stroke-none" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span className="font-bold text-slate-700 bg-blue-50 px-1.5 py-0.5 rounded-sm">{ratingScore.toFixed(1)}</span>
                    <span>{ratingLabel} ({reviewsCount})</span>
                </div>
            </div>

            {hotel.is_near_beach && (
                <div className="mt-1.5 text-xs md:text-sm text-slate-500 font-bold">
                    {hotel.distance_to_beach <= 100 ? "Sát biển" : "Gần biển"}
                    {hotel.distance_to_beach !== undefined && hotel.distance_to_beach !== null && (
                        <span className="font-normal text-slate-400"> (Cách {hotel.distance_to_beach}m)</span>
                    )}
                </div>
            )}

            <div className="mt-2">
                <span className="rounded-sm bg-[#008009] px-2 py-0.5 text-[10px] font-bold text-white tracking-wide uppercase">
                    Ưu đãi giá tốt
                </span>
            </div>
        </div>
    )
}