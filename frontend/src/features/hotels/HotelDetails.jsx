import { clsx } from "clsx"

import Breadcrumbs from "../search/section/Breadcrumbs"
import PropertyTabs from "./PropertyTabs"
import HotelInformation from "./HotelInformation"

export default function HotelDetails() {
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