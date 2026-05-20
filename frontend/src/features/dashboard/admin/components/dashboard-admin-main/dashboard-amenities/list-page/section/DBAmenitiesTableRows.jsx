import HotelAmenityTableRow from "../row/DBAmenitiesRow"

export default function DBAmenitiesTableRows({ filteredAmenities }) {
    return (
        filteredAmenities.map((amenity) => (
            <HotelAmenityTableRow key={amenity.id_hotel_amenity} initialAmenity={amenity} />
        ))
    )
}
