import HotelImageGallery from "./HotelImageGallery"
import HotelMapCard from "./HotelMapCard"
import HotelReview from "./HotelReview"
import Amenities from "./Amenities"
import RoomSelection from "./RoomSelection"

export default function HotelOverview() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3">
                <HotelImageGallery />
                <div className="flex flex-col w-[25%] gap-2">
                    <HotelReview />
                    <HotelMapCard />
                </div>
            </div>
            <Amenities />
            <RoomSelection />
        </div>
    )
}