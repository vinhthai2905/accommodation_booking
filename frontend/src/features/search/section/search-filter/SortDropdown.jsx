import { clsx } from "clsx"
import { useSearchParams } from "react-router"

import SortOptionItem from "../../components/search-filter/SortOptionItem"

export default function SortDropdown({ paginateHotelsList }) {
    const [searchParams] = useSearchParams()
    const location = searchParams.get("location") || "Kết quả"

    return (
        <div className="relative flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-black">
                {location}: tìm thấy {paginateHotelsList.length} chỗ nghỉ
            </h2>
            <div className={clsx(
                "w-fit inline items-center",
                "rounded-full border border-gray-300",
                "bg-white px-4 py-2 text-sm"
            )}>
                <span className="mr-1">Sort by:</span>

                <select className="bg-transparent outline-none cursor-pointer">
                    <SortOptionItem value="top-choice" label="Our top choice" />
                    {/* <SortOptionItem value="price-low-high" label="Price (low to high)" />
                    <SortOptionItem value="price-high-low" label="Price (high to low)" />
                    <SortOptionItem value="rating" label="Rating (high to low)" /> */}
                </select>
            </div>
        </div>

    )
}