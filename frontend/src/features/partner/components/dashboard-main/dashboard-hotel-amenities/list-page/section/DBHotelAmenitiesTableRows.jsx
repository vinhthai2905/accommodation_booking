import HotelAmenityTableRow from "../row/DBHotelAmenitiesRow"

export default function DBHotelAmenitiesTableRows({ filteredAmenities }) {
    return (
        filteredAmenities.map((amenity) => (
            <HotelAmenityTableRow key={amenity.id_hotel_amenity} initialAmenity={amenity} />
        ))
    )
}
