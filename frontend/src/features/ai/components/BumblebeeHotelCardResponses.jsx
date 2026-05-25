import { clsx } from "clsx"
import { Award, MapPin, DollarSign } from "lucide-react";

export default function BumblebeeHotelCardResponses({ message, handleHotelClick }) {
    return (
        <div className="mt-2 flex flex-col gap-2 w-full">
            {message.hotels.map((rec) => {
                const minPriceVND = rec.hotel.appealing_price
                    ? `${Number(rec.hotel.appealing_price).toLocaleString("vi-VN")} VNĐ`
                    : "Liên hệ";
                const distText = rec.hotel.is_near_beach
                    ? `${rec.hotel.distance_to_beach}m ra biển`
                    : "Không gần biển";

                return (
                    <div
                        key={rec.hotel.id_hotel}
                        onClick={() => handleHotelClick(rec.hotel.slug, rec.hotel.id_hotel)}
                        className={clsx(
                            "w-full bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 cursor-pointer",
                            "flex flex-col gap-1.5 shadow-sm group hover:scale-[1.02]",
                            "hover:bg-slate-800 hover:border-amber-400/60 transition-all duration-200"
                        )}
                    >
                        {rec.hotel.primary_image && (
                            <img
                                src={rec.hotel.primary_image}
                                alt={rec.hotel.name}
                                className="w-full h-24 object-cover rounded-lg mb-1"
                            />
                        )}
                        <div className="flex items-start justify-between gap-1">
                            <h5 className="text-xs font-bold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                                {rec.hotel.name}
                            </h5>
                            <span 
                                className={clsx(
                                    "px-1.5 py-0.5 rounded flex items-center gap-0.5 shrink-0",
                                    "bg-amber-500/10 text-amber-400",
                                    "text-[9px] font-extrabold "
                                )}>
                                <Award className="w-2.5 h-2.5" /> {(rec.score * 100).toFixed(0)}%
                            </span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                            {rec.hotel.full_address}
                        </p>
                        <div className="flex items-center justify-between text-[11px] font-semibold mt-1">
                            <span className="text-slate-300 flex items-center gap-0.5">
                                🏖️ {distText}
                            </span>
                            <span className="text-amber-400 flex items-center gap-0.5">
                                <DollarSign className="w-3 h-3 shrink-0" /> {minPriceVND}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}