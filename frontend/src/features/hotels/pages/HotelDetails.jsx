import Breadcrumbs from "../../search/section/Breadcrumbs"
import PropertyTabs from "../section/PropertyTabs"
import HotelInformation from "../section/HotelInformation"

import LoadingScreen from "../../../components/ui/LoadingScreen"

import useHotelDetails from "../../../hooks/hotel/useHotelDetails"

import { clsx } from "clsx"

export default function HotelDetails() {
    const { hotelQuery, roomTypesQuery } = useHotelDetails()

    console.log(roomTypesQuery.error)

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