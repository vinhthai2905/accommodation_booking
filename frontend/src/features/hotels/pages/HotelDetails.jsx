import Breadcrumbs from "../../search/section/search-filter/Breadcrumbs"
import PropertyTabs from "../section/PropertyTabs"
import HotelOverview from "../section/HotelOverview"

import LoadingScreen from "../../../components/ui/LoadingScreen"

import useHotelDetailsContext from "../../../hooks/hotel/useHotelDetailsContext"

import { clsx } from "clsx"

export default function HotelDetails() {
    const { isFetchingHotelData } = useHotelDetailsContext()

    if (isFetchingHotelData)
        return <LoadingScreen />

    return (
        <div className={clsx(
            "mt-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8"
        )}>
            <Breadcrumbs usedFor={"hotelDetails"} />
            <div className={clsx(
                "flex flex-col gap-2"
            )}>
                <PropertyTabs />
                <HotelOverview />
            </div>
        </div>
    )
}