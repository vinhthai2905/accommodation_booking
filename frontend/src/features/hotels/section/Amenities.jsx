import { AmenityItem } from "../components/hotel-amenity/AmenityItem";
import useHotelDetailsContext from "../../../hooks/hotel/useHotelDetailsContext";

export default function Amenities() {
  const { hotelAmenitiesQuery } = useHotelDetailsContext();
  const amenities = hotelAmenitiesQuery.data || [];

  return (
    <ul className="flex flex-wrap gap-3">
      {amenities.map((amenity) => (
        <AmenityItem key={amenity.id_hotel_amenity} label={amenity.name} />
      ))}
    </ul>
  );
}