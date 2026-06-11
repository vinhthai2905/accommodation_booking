import DBHotelTypeRow from "../row/DBHotelTypeRow"

export default function DBHotelTypesTableRows({ filteredHotelTypes }) {
    return (
        <>
            {filteredHotelTypes.map(type => (
                <DBHotelTypeRow key={type.id} initialHotelType={type} />
            ))}
        </>
    )
}
