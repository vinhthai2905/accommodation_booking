import Breadcrumbs from "../section/Breadcrumbs"
import FilterPanel from "../filter/FilterPanel"
import HotelCardSearchGrid from "/src/features/hotels/section/HotelCardSearchGrid"
import SearchSummary from "../filter/SearchSummary"

import { clsx } from "clsx"

export default function SearchList({ onOpenMap, hotelList }) {
    return (
        <div className={clsx(
            "mx-[20%] mt-10",
            "flex flex-col"
        )}>
            <Breadcrumbs usedFor={"searchResults"} />
            <div className={clsx(
                "mt-2 my-6 grid grid-cols-[auto_1fr] gap-5",
                "text-black",
            )}>
                <aside>
                    <FilterPanel />
                </aside>
                <div className="flex flex-col">
                    <SearchSummary hotelList={hotelList} />
                    <HotelCardSearchGrid hotelList={hotelList} />
                </div>
            </div>
        </div>
    )
}