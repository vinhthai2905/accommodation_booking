export default function HotelCard() {
    return (
        <div className="w-[268px] overflow-hidden rounded-xl bg-[#f5f5f5] shadow-md shrink-0">
            <div className="relative">
                <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
                    alt="Hotel"
                    className="h-52 w-full object-cover"
                />

                <button
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow hover:bg-gray-50"
                    aria-label="Add to wishlist"
                >
                    ♡
                </button>
            </div>

            <div className="p-3">
                <h3 className="line-clamp-2 text-[18px] font-bold leading-7 text-neutral-900">
                    TTC Imperial Hotel
                </h3>

                <p className="mt-1 text-sm text-gray-500">Hue, Vietnam</p>

                <div className="mt-3 flex items-start gap-2">
                    <div className="rounded-[4px] bg-[#003b95] px-[6px] py-[2px] text-sm font-bold text-white">
                        9.1
                    </div>

                    <div className="text-sm leading-5">
                        <p className="font-medium text-neutral-900">Perfect</p>
                        <p className="text-gray-500">1,362 reviews</p>
                    </div>
                </div>
            </div>
        </div>
    )
}