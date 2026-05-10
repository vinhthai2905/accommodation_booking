import { clsx } from "clsx"
import { Info, MapPin, LucideThumbsUp } from "lucide-react"

export default function DirectionCard({ booking }) {
    return (
        <div className="mt-6">
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">Đi đến chỗ nghỉ</h2>

                <button
                    type="button"
                    className="text-slate-400 hover:text-slate-600"
                >
                    <Info size={16} />
                </button>
            </div>

            <p className="mt-2 flex items-start gap-2 text-sm text-slate-600">
                <MapPin size={14} className="mt-0.5 shrink-0 text-slate-400" />
                <span>
                    {booking?.direction ||
                        "Từ Sân bay Quốc tế Đà Nẵng (DAD): 9 phút (7 km) lái xe"}
                </span>
            </p>

            <button
                type="button"
                className={clsx(
                    "flex items-center justify-center",
                    "w-full",
                    "mt-3 py-3",
                    "gap-2",
                    "text-sm font-semibold text-white",
                    "bg-blue-700",
                    "rounded-xl",
                    "hover:bg-blue-800 active:bg-blue-800",
                    "transition-colors",
                )}
            >
                <LucideThumbsUp size={16} />
                Được đặt nhiều nhất
            </button>
        </div>
    )
}