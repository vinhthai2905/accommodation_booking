import { useState } from "react"
import HotelHeader from "../components/hotel-overview/HotelHeader"
import HotelImageGallery from "./HotelImageGallery"
import HotelMapCard from "../components/hotel-map-card/HotelMapCard"
import HotelReviewOverview from "../components/hotel-review/HotelReviewOverview"
import Amenities from "./Amenities"
import RoomAvailability from "./RoomAvailability"
import HotelReviewListDrawer from "../components/hotel-review/HotelReviewListDrawer"

export default function HotelOverview() {
    const [isReviewDrawerOpen, setIsReviewDrawerOpen] = useState(false)

    return (
        <>
            <HotelHeader />
            <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                    <HotelImageGallery />
                    <div className="flex flex-col w-[25%] gap-2">
                        <HotelReviewOverview onRatingClick={() => setIsReviewDrawerOpen(true)} />
                        <HotelMapCard />
                    </div>
                </div>
                <Amenities />
                <RoomAvailability />
            </div>

            <HotelReviewListDrawer 
                isReviewDrawerOpen={isReviewDrawerOpen} 
                onClose={() => setIsReviewDrawerOpen(false)} 
            />
        </>
    )
}