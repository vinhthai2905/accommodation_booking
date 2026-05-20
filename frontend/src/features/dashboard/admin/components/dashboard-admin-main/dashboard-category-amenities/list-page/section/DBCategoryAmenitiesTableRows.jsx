import HotelAmenityTableRow from "../row/DBCategoryAmenitiesRow"

export default function DBCategoryAmenitiesTableRows({ filteredAmenities }) {
    return (
        filteredAmenities.map((amenity) => (
            <HotelAmenityTableRow key={amenity.id_hotel_amenity} initialAmenity={amenity} />
        ))
    )
}
