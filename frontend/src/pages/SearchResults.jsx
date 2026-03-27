import { clsx } from "clsx"

import Breadcrumbs from "../features/search/Breadcrumbs"
import FilterPanel from "../features/search/filter/FilterPanel"

import HotelCardGrid from "/src/features/hotels/HotelCardGrid"

export default function SearchResults() {
    return (
        <div className={clsx(
            "mx-[20%] mt-10",
            "flex flex-col"
        )}>
            <Breadcrumbs />
            <div className={clsx(
                "mt-2 grid grid-cols-[auto_1fr] gap-5",
                "text-black",
            )}>
                <aside>
                    <FilterPanel />
                </aside>
                <HotelCardGrid />
            </div>
        </div>
    )
}