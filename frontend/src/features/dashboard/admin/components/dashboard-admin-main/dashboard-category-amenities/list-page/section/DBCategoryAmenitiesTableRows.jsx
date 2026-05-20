
import DBCategoryAmenityRow from "../row/DBCategoryAmenitiesRow"

export default function DBCategoryAmenitiesTableRows({ filteredAmenities }) {
    return (
        filteredAmenities.map((amenity) => (
            <DBCategoryAmenityRow key={amenity.id_hotel_amenity} initialAmenity={amenity} />
        ))
    )
}
