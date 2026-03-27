import HotelImageGallery from "./HotelImageGallery"
import HotelMapCard from "./HotelMapCard"
import HotelReview from "./HotelReview"

export default function HotelOverview() {
    return (
        <div className="flex">
            <HotelImageGallery />
            <div className="flex flex-col h-30">
                <HotelReview />
                <HotelMapCard />
            </div>
        </div>
    )
}