import { clsx } from "clsx"

import HotelCardSlider from "../HotelCardSlider";
import OffersSection from "../OffersSection";

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