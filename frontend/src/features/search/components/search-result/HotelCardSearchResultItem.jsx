import { clsx } from "clsx"
import { Link, useLocation } from "react-router"
import { Star, ThumbsUp, Plus, Heart, MapPin, Check, Building } from "lucide-react"

export default function HotelCardSearchResultItem({ hotel }) {
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

            {/* Left Column: Image */}
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

                {/* Heart Button */}
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

            {/* Right Column: Content */}
            <div className="flex flex-1 flex-col md:flex-row justify-between p-4 gap-4">
                
                {/* Details Section */}
                <div className="flex-1 flex flex-col gap-2">
                    <div>
                        {/* Title block */}
                        <Link 
                            to={`/hotel/${hotel.slug}/${hotel.id_hotel}${location.search}`}
                            className="text-lg font-bold text-[#003b95] hover:text-blue-800 hover:underline leading-snug"
                        >
                            {hotel.name}
                        </Link>

                        {/* Stars, Genius, and Thumbs Up Badge */}
                        <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                            <div className="flex items-center text-amber-400">
                                <Star size={12} fill="currentColor" className="stroke-none" />
                                <Star size={12} fill="currentColor" className="stroke-none" />
                                <Star size={12} fill="currentColor" className="stroke-none" />
                                <Star size={12} fill="currentColor" className="stroke-none" />
                                <Star size={12} fill="currentColor" className="stroke-none" />
                            </div>
                            <div className="flex items-center gap-[2px] rounded-sm bg-[#febb02] px-1 py-[2px] text-white scale-[0.8] origin-left shrink-0">
                                <ThumbsUp size={10} fill="currentColor" strokeWidth={0} />
                                <Plus size={10} strokeWidth={3} />
                            </div>
                            <span className="rounded-sm bg-[#003b95] px-1.5 py-[2px] text-[10px] font-bold text-white tracking-wide shrink-0">
                                Genius
                            </span>
                        </div>
                    </div>

                    {/* Beachfront / Location tag */}
                    <div className="text-xs font-semibold text-[#003b95] underline flex items-center gap-1 flex-wrap">
                        <MapPin size={12} className="text-slate-400" />
                        <span>{hotel.full_address || "Đà Nẵng"}</span>
                        <span className="text-slate-400 no-underline">·</span>
                        <span className="text-slate-500 no-underline font-normal">Cách trung tâm 2.3 km</span>
                    </div>

                    {/* Getaway Deal Tag */}
                    <div className="inline-flex">
                        <span className="rounded-md bg-[#008009] px-2 py-1 text-[11px] font-bold text-white tracking-wide">
                            Ưu đãi giá tốt
                        </span>
                    </div>

                    {/* Ratings Block */}
                    <div className="flex flex-col gap-0.5 mt-1">
                        <div className="flex items-center gap-2">
                            <div className="flex h-6 w-7 items-center justify-center rounded-[4px] bg-[#003b95] text-xs font-bold text-white">
                                9.3
                            </div>
                            <span className="text-xs font-bold text-slate-800">Tuyệt vời</span>
                            <span className="text-xs text-slate-500">· 34 đánh giá</span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-600 ml-9">9.3 Địa điểm</span>
                    </div>

                    {/* Description excerpt */}
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        Căn hộ có hồ bơi riêng, nằm gần bãi biển Mỹ Khê xinh đẹp. Nơi nghỉ dưỡng lý tưởng với đầy đủ tiện nghi đẳng cấp quốc tế, phòng ngủ hiện đại và tầm nhìn hướng phố tuyệt đẹp.
                    </p>
                </div>

                {/* Price & Booking Section (Right/Bottom column) */}
                <div className="w-full md:w-[220px] flex flex-col justify-end md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-4">
                    <div className="flex flex-col md:items-end gap-1 mb-3">
                        <span className="text-xs text-slate-500 font-medium">1 đêm, 2 người lớn</span>
                        
                        {hotel.appealing_price && hotel.appealing_price > 0 ? (
                            <>
                                {/* Original Price Struck Through */}
                                <span className="text-xs text-red-600 line-through font-semibold">
                                    VND {originalPrice.toLocaleString('vi-VN')}
                                </span>
                                {/* Current Appealing Price */}
                                <span className="text-xl font-extrabold text-slate-900 leading-none">
                                    VND {hotel.appealing_price.toLocaleString('vi-VN')}
                                </span>
                            </>
                        ) : (
                            <span className="text-sm font-extrabold text-slate-800">
                                Xem chi tiết để biết giá
                            </span>
                        )}
                        
                        <span className="text-[10px] text-slate-500 font-medium mt-0.5">Đã bao gồm thuế và phí</span>
                    </div>

                    {/* Perks */}
                    <div className="flex flex-col gap-1 mb-4 md:items-end text-xs text-[#008009] font-bold">
                        <span className="flex items-center gap-1">
                            <Check size={14} className="stroke-[3]" />
                            Bao gồm bữa sáng
                        </span>
                        <span className="flex items-center gap-1">
                            <Check size={14} className="stroke-[3]" />
                            Không cần trả trước - thanh toán tại chỗ
                        </span>
                    </div>

                    {/* Action Button */}
                    <Link
                        to={`/hotel/${hotel.slug}/${hotel.id_hotel}${location.search}`}
                        className={clsx(
                            "w-full text-center rounded-md bg-[#003b95] px-4 py-2.5",
                            "text-sm font-bold text-white hover:bg-blue-800 transition-colors shadow-sm cursor-pointer"
                        )}
                    >
                        Xem phòng trống
                    </Link>
                </div>

            </div>
        </div>
    )
}