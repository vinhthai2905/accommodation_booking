import DBAmenityRow from "../row/DBAmenityRow"

export default function DBAmenitiesTableRows({ filteredAmenities }) {
    return (
        filteredAmenities.map((amenity) => (
            <DBAmenityRow key={amenity.id_hotel_amenity} initialAmenity={amenity} />
        ))
    )
}
