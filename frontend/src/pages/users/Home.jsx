import { clsx } from "clsx"

import HotelCardSlider from "../../features/hotels/components/HotelCardSlider"

import OffersSection from "/src/components/ui/OffersSection"

export default function Home() {
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