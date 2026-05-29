import HotelHeader from "../components/hotel-overview/HotelHeader"
import HotelImageGallery from "./HotelImageGallery"
import HotelMapCard from "../components/hotel-map-card/HotelMapCard"
import HotelReview from "../components/hotel-review/HotelReview"
import Amenities from "./Amenities"
import RoomAvailability from "./RoomAvailability"

export default function HotelOverview() {
    return (
        <>
            <HotelHeader />
            <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                    <HotelImageGallery />
                    <div className="flex flex-col w-[25%] gap-2">
                        <HotelReview />
                        <HotelMapCard />
                    </div>
                </div>
                <Amenities />
                <RoomAvailability />
            </div>
        </>
    )
}