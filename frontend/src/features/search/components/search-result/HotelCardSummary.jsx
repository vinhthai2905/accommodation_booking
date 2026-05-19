import { clsx } from "clsx"
import { Star, ThumbsUp, Plus, Heart, MapPin, Building } from "lucide-react"
import { Link } from "react-router"

export default function HotelCardSummary({ hotel }) {
    return (
        <>
            <div className="relative w-full md:w-70 h-55 md:h-auto shrink-0 overflow-hidden bg-slate-50">
                <Link to={`/hotel/${hotel.slug}/${hotel.id_hotel}${location.search}`} className="block h-full w-full">
                    {hotel.primary_image ? (
                        <img
                            src={hotel.primary_image}
                            alt={hotel.name}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-300">
                            <Building size={48} />
                        </div>
                    )}
                </Link>

                <button
                    type="button"
                    className={clsx(
                        "absolute right-3 top-3",
                        "flex h-8 w-8 items-center justify-center",
                        "rounded-full bg-white shadow-md text-slate-600 hover:text-red-500 hover:scale-105 transition-all cursor-pointer"
                    )}
                    aria-label="Save property"
                >
                    <Heart size={16} />
                </button>
            </div>

            <div className="flex flex-1 flex-col md:flex-row justify-between p-4 gap-4">
                <div className="flex-1 flex flex-col gap-2">
                    <div>
                        <Link
                            to={`/hotel/${hotel.slug}/${hotel.id_hotel}${location.search}`}
                            className="text-lg font-bold text-[#003b95] hover:text-blue-800 hover:underline leading-snug"
                        >
                            {hotel.name}
                        </Link>

                        <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                            <div className="flex items-center text-amber-400">
                                <Star size={12} fill="currentColor" className="stroke-none" />
                                <Star size={12} fill="currentColor" className="stroke-none" />
                                <Star size={12} fill="currentColor" className="stroke-none" />
                                <Star size={12} fill="currentColor" className="stroke-none" />
                                <Star size={12} fill="currentColor" className="stroke-none" />
                            </div>
                            <div className="flex items-center gap-0.5 rounded-sm bg-[#febb02] px-1 py-0.5 text-white scale-[0.8] origin-left shrink-0">
                                <ThumbsUp size={10} fill="currentColor" strokeWidth={0} />
                                <Plus size={10} strokeWidth={3} />
                            </div>
                            <span className="rounded-sm bg-[#003b95] px-1.5 py-0.5 text-[10px] font-bold text-white tracking-wide shrink-0">
                                Genius
                            </span>
                        </div>
                    </div>

                    <div className="text-xs font-semibold text-[#003b95] underline flex items-center gap-1 flex-wrap">
                        <MapPin size={12} className="text-slate-400" />
                        <span>{hotel.full_address || "Đà Nẵng"}</span>
                        <span className="text-slate-400 no-underline">·</span>
                        <span className="text-slate-500 no-underline font-normal">Cách trung tâm 2.3 km</span>
                    </div>

                    <div className="inline-flex">
                        <span className="rounded-md bg-[#008009] px-2 py-1 text-[11px] font-bold text-white tracking-wide">
                            Ưu đãi giá tốt
                        </span>
                    </div>

                    <div className="flex flex-col gap-0.5 mt-1">
                        <div className="flex items-center gap-2">
                            <div className="flex h-6 w-7 items-center justify-center rounded-sm bg-[#003b95] text-xs font-bold text-white">
                                9.3
                            </div>
                            <span className="text-xs font-bold text-slate-800">Tuyệt vời</span>
                            <span className="text-xs text-slate-500">· 34 đánh giá</span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-600 ml-9">9.3 Địa điểm</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        Căn hộ có hồ bơi riêng, nằm gần bãi biển Mỹ Khê xinh đẹp.
                        Nơi nghỉ dưỡng lý tưởng với đầy đủ tiện nghi đẳng cấp quốc tế,
                        phòng ngủ hiện đại và tầm nhìn hướng phố tuyệt đẹp.
                    </p>
                </div>
            </div>
        </>
    )
}