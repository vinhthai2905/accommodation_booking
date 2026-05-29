import { clsx } from "clsx"

import SortOptionItem from "../../components/search-filter/SortOptionItem"

export default function SortDropdown({ hotelList }) {
    return (
        <div className="relative flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-black">
                TP. Ho Chi Minh: tìm thấy {hotelList.length} chỗ nghĩ
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