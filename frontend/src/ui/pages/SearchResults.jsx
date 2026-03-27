import { clsx } from "clsx"

import Header from "../Header"
import Breadcrumbs from "../Breadcrumbs"

import HotelCard from "../HotelCard"
import FilterBox from "../FilterBox"

export default function SearchResults() {
    return (
        <div className={clsx(
            "mx-[20%] mt-10",
            "flex flex-col"
        )}>
            <Breadcrumbs />
            <div className={clsx(
                "mt-2 grid grid-cols-[auto_1fr]",
                "text-black",
            )}>
                <aside>
                    <FilterBox />
                </aside>
                <div className={clsx(
                    "grid auto-rows-auto"
                )}>
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                </div>
            </div>
        </div>
    )
}