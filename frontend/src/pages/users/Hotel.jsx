import HotelDetails from "../../features/hotels/pages/HotelDetails"

import HotelDetailsProvider from "../../context/HotelDetailsProvider"

export default function Hotel() {
    return (
        <HotelDetailsProvider>
            <div className="mb-5">
                <HotelDetails />
            </div>
        </HotelDetailsProvider>
    )
}