import Breadcrumbs from "../section/search-filter/Breadcrumbs"
import FilterPanel from "../section/search-filter/FilterPanel"
import HotelCardSearchGrid from "../section/search-result/HotelCardSearchGrid"
import SearchSummary from "../section/search-filter/SearchSummary"
import HotelSearchPagination from "../components/search-result/HotelSearchPagination"

import { clsx } from "clsx"

export default function SearchList({ onOpenMap, paginateHotelsList, totalHotels }) {
    return (
        <div className={clsx(
            "w-full max-w-285 mx-auto px-4 sm:px-6 md:px-8 mt-10",
            "flex flex-col"
        )}>
            <Breadcrumbs usedFor={"SearchHotelsResult"} />
            <div className={clsx(
                "mt-2 my-6 grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-5",
                "text-black",
            )}>
                <aside>
                    <FilterPanel />
                </aside>
                <div className="flex flex-col">
                    <SearchSummary paginateHotelsList={paginateHotelsList} />
                    <HotelCardSearchGrid paginateHotelsList={paginateHotelsList} />
                    <HotelSearchPagination paginateHotelsList={paginateHotelsList} totalHotels={totalHotels}/>
                </div>
            </div>
        </div>
    )
}