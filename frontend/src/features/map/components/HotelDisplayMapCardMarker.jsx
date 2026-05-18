import { ThumbsUp, Plus } from "lucide-react"

export default function HotelDisplayMapCardMarker({ hotel }) {
    return (
        <div className="flex w-65 flex-col gap-3 pb-1 pt-1">
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm text-wrap font-bold leading-tight text-slate-900">
                    {hotel.name}
                </h3>
                <div className="mt-0.5 flex shrink-0 items-center gap-0.5 rounded bg-[#febb02] px-1 py-0.5 text-white">
                    <ThumbsUp size={12} fill="currentColor" strokeWidth={1} />
                    <Plus size={14} strokeWidth={3} />
                </div>
            </div>

            <div className="flex items-end justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#003b95] text-sm font-bold text-white">
                        9.4
                    </div>
                    <span className="text-[12px] font-medium text-slate-700">
                        Wonderful
                    </span>
                </div>

                <div className="text-right text-[12px] leading-tight text-slate-600">
                    Add dates to see
                    <br /> prices
                </div>
            </div>
        </div>
    )
}