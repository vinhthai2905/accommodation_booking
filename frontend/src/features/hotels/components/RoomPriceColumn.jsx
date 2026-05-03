import { Info } from "lucide-react";

export default function RoomPriceColumn({ roomType }) {
    return (
        <div className="border-l border-blue-300 p-4 flex flex-col gap-1">
            <div className="flex items-center gap-1">
                <span className="text-lg font-bold">VND {Intl.NumberFormat("vi-VN").format(roomType.price)}</span>
                <Info className="h-4 w-4 text-gray-500" />
            </div>
            
            <div className="flex flex-col items-start gap-1 mt-1">
               
                <span className="bg-[#003b95] text-white px-2 py-0.5 rounded text-xs font-bold">
                    Genius
                </span>
                <span className="bg-[#008234] text-white px-2 py-0.5 rounded text-xs">
                    Ưu Đãi Mùa Du Lịch
                </span>
            </div>
        </div>
    );
}