import DBHotelImageRow from "../row/DBHotelImageRow"

export default function DBHotelImageTableRows({ filteredImages }) {
    return (
        <>
            {filteredImages.map((image) => (
                <DBHotelImageRow
                    key={image.id_hotel_image}
                    initialImage={image}
                />
            ))}
        </>
    )
}
