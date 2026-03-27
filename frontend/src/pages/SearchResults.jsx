import { clsx } from "clsx"

import Breadcrumbs from "../features/search/Breadcrumbs"
import FilterPanel from "../features/search/filter/FilterPanel"
import HotelCardGrid from "/src/features/hotels/HotelCardGrid"
import SearchSummary from "../features/search/filter/SearchSummary"

export default function SearchResults() {
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
                    <SearchSummary />
                    <HotelCardGrid />
                </div>
            </div>
        </div>
    )
}