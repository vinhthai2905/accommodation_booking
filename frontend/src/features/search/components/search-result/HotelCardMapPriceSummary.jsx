export default function HotelCardMapPriceSummary({nights, adults, children, totalCurrentPrice, totalOriginalPrice}) {
    return (
        <div className="flex flex-col gap-1 border-t border-slate-100 pt-2 text-right items-end">
            <div className="text-xs text-slate-500 font-medium">
                {nights} đêm, {adults} người lớn{children > 0 && `, ${children} trẻ em`}
            </div>

            {totalCurrentPrice > 0 ? (
                <div className="flex flex-col items-end leading-none gap-1 mt-0.5">
                    {totalOriginalPrice > totalCurrentPrice && (
                        <span className="text-xs text-red-600 line-through font-semibold leading-none">
                            VND {totalOriginalPrice.toLocaleString('vi-VN')}
                        </span>
                    )}
                    <span className="text-base md:text-lg font-black text-slate-900 leading-none">
                        VND {totalCurrentPrice.toLocaleString('vi-VN')}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">Đã bao gồm thuế và phí</span>
                </div>
            ) : (
                <span className="text-xs font-extrabold text-slate-800 leading-none">
                    Xem chi tiết giá
                </span>
            )}
        </div>
    )
}