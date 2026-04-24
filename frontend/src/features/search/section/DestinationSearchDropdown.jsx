import { clsx } from "clsx"

import { useQuery } from "@tanstack/react-query";
import { fetchWard } from "../../../services/locationAPI";

export default function DestinationSearchDropdown({ onSelect }) {
    const { data, isPending, error } = useQuery({
        queryKey: ["destinationQueries"],
        queryFn: fetchWard
    })

    return (
        <div
            className={clsx(
                "absolute left-0 top-full mt-2 w-full",
                "bg-white border border-gray-200 shadow-lg rounded-md",
                "overflow-hidden"
            )}
        >
            {isPending && <div className="px-4 py-3 text-sm text-gray-500">Đang tìm kiếm....</div>}
            {error && <div className="px-4 py-3 text-sm text-red-500">Có lỗi xảy ra khi đang tìm kiếm.</div>}
            {data && data.map((item) => (
                <div
                    key={item.id_ward}
                    onClick={() => onSelect(item.ward_name)}
                    className="px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 text-black text-sm"
                >
                    {item.ward_name}
                </div>
            ))}
        </div>
    );
}