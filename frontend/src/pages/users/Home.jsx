import { clsx } from "clsx"

import HotelCardSlider from "../../features/hotels/components/HotelCardSlider"

import OffersSection from "/src/components/ui/OffersSection"
import { useTabTitle } from "../../hooks/common/useTabTitle"

export default function Home() {
    useTabTitle("Booking.com | Official Site")

    return (
        <main className={clsx(
            "text-black mt-10",
            "",
            "xl:mx-[20%]"
        )}>
            <HotelCardSlider />
            <OffersSection />
        </main>
    )
}