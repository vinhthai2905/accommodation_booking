import { clsx } from "clsx"

import HotelCardResult from "./HotelCardResult"

export default function HotelCardGrid() {
    return (
        <div className={clsx(
            "grid grid-cols-3 gap-2 auto-rows-auto"
        )}>
            <HotelCardResult />
            <HotelCardResult />
            <HotelCardResult />
            <HotelCardResult />
            <HotelCardResult />
        </div>
    )
}