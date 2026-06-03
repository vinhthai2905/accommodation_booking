import Breadcrumbs from "../../search/section/search-filter/Breadcrumbs"
import PropertyTabs from "../section/PropertyTabs"
import HotelOverview from "../section/HotelOverview"

import { clsx } from "clsx"
import { useLocation } from "react-router"

import LoadingScreen from "../../../components/ui/LoadingScreen"

import { useTabTitle } from "../../../hooks/common/useTabTitle"
import useHotelDetailsContext from "../../../hooks/hotel/useHotelDetailsContext"


export default function HotelDetails() {
    const { isFetchingHotelData, hotelQuery } = useHotelDetailsContext()

    const hotelTabTitle = hotelQuery.data?.name || "Hotel Details"
    useTabTitle(`${hotelTabTitle} | Booking.com`)

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