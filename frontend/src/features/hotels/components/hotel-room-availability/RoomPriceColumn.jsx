import { Info } from "lucide-react";

export default function RoomPriceColumn({ roomType }) {
    return (
        <div className="px-4 py-3 flex flex-col gap-2 justify-start">
            <div className="flex items-center gap-1">
                <span className="text-base font-bold text-slate-900">
                    {Intl.NumberFormat("vi-VN").format(roomType.price)}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">VND</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
                <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-wider">
                    Genius
                </span>
                <span className="bg-emerald-600 text-white px-1.5 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider">
                    Ưu Đãi Mùa Du Lịch
                </span>
            </div>
        </div>
    );
}