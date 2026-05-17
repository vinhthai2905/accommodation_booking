import HotelAmenityTableRow from "../row/DBHotelCategoryAmenitiesRow"

export default function DBHotelCategoryAmenitiesTableRows({ filteredAmenities }) {
    return (
        filteredAmenities.map((amenity) => (
            <HotelAmenityTableRow key={amenity.id_hotel_amenity} initialAmenity={amenity} />
        ))
    )
}
