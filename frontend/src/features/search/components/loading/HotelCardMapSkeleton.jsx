import { clsx } from "clsx"

export default function HotelCardMapSkeleton() {
    return (
        <div
            className={clsx(
                "relative flex w-full h-60 overflow-hidden shrink-0",
                "bg-white rounded-lg border border-slate-200 shadow-sm"
            )}
        >
            <div className="relative w-36 shrink-0 bg-slate-200 animate-pulse" />

            <div className="flex-1 p-3.5 flex flex-col justify-between min-w-0">
                <div>
                    <div className="flex justify-between items-start gap-2.5">
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse" />
                            <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                            <div className="w-5 h-5 bg-slate-200 rounded-full animate-pulse" />
                        </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="w-3 h-3 bg-slate-200 rounded-full animate-pulse" />
                            ))}
                        </div>
                        <div className="h-4 bg-slate-200 rounded w-8 animate-pulse" />
                        <div className="h-4 bg-slate-200 rounded w-20 animate-pulse" />
                    </div>

                    <div className="mt-3 h-3 bg-slate-200 rounded w-1/4 animate-pulse" />

                    <div className="mt-2.5 h-5 bg-slate-200 rounded w-24 animate-pulse" />
                </div>

                <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-2 items-end">
                    <div className="h-3.5 bg-slate-200 rounded w-28 animate-pulse" />
                    <div className="h-3 bg-slate-200 rounded w-16 animate-pulse" />
                    <div className="h-5.5 bg-slate-200 rounded w-24 animate-pulse" />
                    <div className="h-2.5 bg-slate-200 rounded w-32 animate-pulse" />
                </div>
            </div>
        </div>
    )
}