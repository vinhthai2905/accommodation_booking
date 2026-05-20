import DBAmenityRow from "../row/DBAmenitiesRow"

export default function DBAmenitiesTableRows({ filteredAmenities }) {
    return (
        filteredAmenities.map((amenity) => (
            <DBAmenityRow key={amenity.id_hotel_amenity} initialAmenity={amenity} />
        ))
    )
}
