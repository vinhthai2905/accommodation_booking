import Breadcrumbs from "../search/section/Breadcrumbs"
import PropertyTabs from "./PropertyTabs"
import HotelInformation from "./HotelInformation"

import LoadingScreen from "../../components/ui/LoadingScreen"

import { clsx } from "clsx"

import useHotelDetails from "../../hooks/hotel/useHotelDetails"

export default function HotelDetails() {
    const { hotelQuery, roomTypesQuery } = useHotelDetails()

    if (hotelQuery.isLoading || roomTypesQuery.isLoading)
        return <LoadingScreen />

    return (
        <div className={clsx(
            "mt-10 mx-[20%]"
        )}>
            <Breadcrumbs usedFor={"hotelDetails"} />
            <div className={clsx(
                "flex flex-col gap-2"
            )}>
                <PropertyTabs />
                <HotelInformation />
            </div>
        </div>
    )
}