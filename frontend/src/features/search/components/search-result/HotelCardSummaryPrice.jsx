import { clsx } from "clsx"
import { Link } from "react-router"
import { Check } from "lucide-react"

export default function HotelCardSummaryPrice({ hotel, originalPrice }) {
    return (
        <div className={clsx(
            "w-full md:w-55 px-4 py-4",
            "flex flex-col justify-end",
            "md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-4"
        )}>
            <div className="flex flex-col md:items-end gap-1 mb-3">
                <span className="text-xs text-slate-500 font-medium">1 đêm, 2 người lớn</span>

                {hotel.appealing_price && hotel.appealing_price > 0 ? (
                    <>
                        <span className="text-xs text-red-600 line-through font-semibold">
                            VND {originalPrice.toLocaleString('vi-VN')}
                        </span>
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

            <div className="flex flex-col gap-1 mb-4 md:items-end text-xs text-[#008009] font-bold">
                <span className="flex items-center gap-1">
                    <Check size={14} className="stroke-3" />
                    Bao gồm bữa sáng
                </span>
                <span className="flex items-center gap-1">
                    <Check size={14} className="stroke-3" />
                    Không cần trả trước - thanh toán tại chỗ
                </span>
            </div>

            <Link
                to={`/hotel/${hotel.slug}/${hotel.id_hotel}${location.search}`}
                target="_blank"
                state={{
                    hotelName: hotel.name,
                }}
                rel="noopener noreferrer"
                className={clsx(
                    "w-full text-center rounded-md bg-[#003b95] px-4 py-2.5",
                    "text-sm font-bold text-white hover:bg-blue-800 transition-colors shadow-sm cursor-pointer"
                )}
            >
                Xem phòng trống
            </Link>
        </div>
    )
}