import { ThumbsUp, Plus, Star, MapPin, Building, Heart, X } from "lucide-react"

export default function HotelDisplayMapCard({ hotel, onClose }) {
    return (
        <div className="flex w-full flex-col bg-white overflow-hidden rounded-lg border border-slate-200 shadow-md">
            {/* Image section with heart and close buttons */}
            <div className="relative h-48 w-full bg-slate-100">
                {hotel.primary_image ? (
                    <img
                        src={hotel.primary_image}
                        alt={hotel.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <Building size={48} />
                    </div>
                )}

                {/* Heart & Close Buttons */}
                <div className="absolute right-3 top-3 flex items-center gap-2">
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-md hover:text-red-500 hover:scale-105 transition-all cursor-pointer"
                        aria-label="Yêu thích"
                    >
                        <Heart size={18} />
                    </button>
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-md hover:text-slate-900 hover:scale-105 transition-all cursor-pointer"
                            aria-label="Đóng"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col gap-4">
                {/* Title and Badge */}
                <div>
                    <h2 className="text-lg font-extrabold leading-snug text-slate-900 line-clamp-2">
                        {hotel.name}
                    </h2>

                    {/* Stars and Booking Thumbs Up */}
                    <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex items-center text-amber-400">
                            <Star size={14} fill="currentColor" className="stroke-none" />
                            <Star size={14} fill="currentColor" className="stroke-none" />
                            <Star size={14} fill="currentColor" className="stroke-none" />
                            <Star size={14} fill="currentColor" className="stroke-none" />
                            <Star size={14} fill="currentColor" className="stroke-none" />
                        </div>
                        <div className="flex items-center gap-[2px] rounded-sm bg-[#febb02] px-1 py-[2px] text-white scale-90 shrink-0">
                            <ThumbsUp size={10} fill="currentColor" strokeWidth={0} />
                            <Plus size={10} strokeWidth={3} />
                        </div>
                    </div>
                </div>

                {/* Rating row */}
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-8 items-center justify-center rounded-md bg-[#003b95] text-sm font-bold text-white">
                            9.4
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-sm font-bold text-[#003b95]">Tuyệt vời</span>
                            <span className="text-[11px] text-slate-500 mt-0.5">937 đánh giá</span>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-700">
                        <span className="font-semibold text-[#003b95]">9.2</span>
                        <span className="text-slate-500">Địa điểm cực đẹp</span>
                    </div>
                </div>

                {/* Address Info */}
                <div className="flex items-start gap-1.5 text-sm text-slate-600">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
                    <span>{hotel.full_address || "Đà Nẵng, Việt Nam"}</span>
                </div>

                {/* Dynamic Price */}
                <div className="rounded-lg bg-blue-50/50 border border-blue-100/50 p-3 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium">Giá mỗi đêm từ</span>
                        <span className="text-base font-extrabold text-[#003b95]">
                            {hotel.appealing_price && hotel.appealing_price > 0
                                ? `${hotel.appealing_price.toLocaleString('vi-VN')} đ`
                                : 'Xem chi tiết giá'}
                        </span>
                    </div>
                    <button 
                        type="button" 
                        className="rounded-md bg-[#003b95] px-4 py-2 text-xs font-bold text-white hover:bg-blue-800 transition-colors shadow-sm cursor-pointer"
                    >
                        Xem phòng trống
                    </button>
                </div>

                {/* Top Attractions (Mocked like booking.com to look beautiful) */}
                <div className="mt-1 flex flex-col gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Địa điểm lân cận</h3>
                    <div className="flex flex-col gap-2 text-xs">
                        <div className="flex justify-between items-center text-slate-700">
                            <span>Cầu Rồng</span>
                            <span className="font-medium text-slate-500">2.0 km</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-700">
                            <span>Bảo tàng Chăm</span>
                            <span className="font-medium text-slate-500">2.3 km</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-700">
                            <span>Cầu Trần Thị Lý</span>
                            <span className="font-medium text-slate-500">2.7 km</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
