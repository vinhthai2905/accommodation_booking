import { clsx } from "clsx"

import GuestNav from "./GuestNav"
import ServiceNav from "./ServiceNav"

export default function NavigationBar() {
    return (
        <div className={clsx(
            "flex flex-col pt-3 gap-2 mx-[10%]",
            "xl:mx-[20%]"
        )}>
            <GuestNav />
            <ServiceNav />
        </div>
    )
}