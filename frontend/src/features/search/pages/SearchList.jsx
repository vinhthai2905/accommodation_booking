import Breadcrumbs from "../section/search-filter/Breadcrumbs"
import FilterPanel from "../section/search-filter/FilterPanel"
import HotelCardSearchGrid from "../section/search-result/HotelCardSearchGrid"
import SearchSummary from "../section/search-filter/SearchSummary"

import { clsx } from "clsx"

export default function SearchList({ onOpenMap, hotelList }) {

    return (
        <div className={clsx(
            "w-full max-w-[1140px] mx-auto px-4 sm:px-6 md:px-8 mt-10",
            "flex flex-col"
        )}>
            <Breadcrumbs usedFor={"HotelsSearchResult"} />
            <div className={clsx(
                "mt-2 my-6 grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-5",
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