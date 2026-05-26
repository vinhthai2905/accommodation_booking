import { clsx } from "clsx"
import { X, Sparkles } from "lucide-react"

export default function BumblebeeChatboxHeader({ setIsOpenBumblebee }) {
    return (
        <div className={clsx(
            "bg-linear-to-r from-amber-500 to-yellow-400 text-slate-955 px-4 py-3.5",
            "flex items-center justify-between font-bold border-b border-yellow-500/20"
        )}>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <span className="text-xl">🐝</span>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
                </div>
                <div>
                    <h4 className="text-sm font-extrabold tracking-wide">BUMBLEBEE AI</h4>
                    <p className="text-[10px] text-slate-800 font-semibold flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" /> Trợ lý du lịch trực tuyến
                    </p>
                </div>
            </div>
            <button
                onClick={() => setIsOpenBumblebee(false)}
                className="hover:bg-slate-950/15 p-1 rounded-full transition-colors cursor-pointer"
            >
                <X className="w-5 h-5 stroke-[2.5]" />
            </button>
        </div>
    )
}