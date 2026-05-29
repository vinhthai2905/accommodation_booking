import HotelCard from "/src/features/hotels/components/HotelCard"
import ButtonSlide from "/src/components/ui/ButtonSlide"

import { useRef } from "react"
import { clsx } from "clsx"

export default function HotelCardSlider() {
    const scrollRef = useRef(null)

    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 300,
            behavior: "smooth",
        })
    }

    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -300,
            behavior: "smooth",
        })
    }

    return (
        <div className={clsx(
            "flex flex-col"
        )}>
            <h1>Bạn vẫn quan tâm</h1>
            <div className="relative">
                <ButtonSlide direction="left" scrollFunc={scrollLeft} />

                <div className="overflow-hidden">
                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2"
                    >
                        <HotelCard />
                        <HotelCard />
                        <HotelCard />
                        <HotelCard />
                    </div>
                </div>

                <ButtonSlide direction="right" scrollFunc={scrollRight} />
            </div>
        </div>

    )
}