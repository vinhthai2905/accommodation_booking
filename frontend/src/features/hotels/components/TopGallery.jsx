import useHotelDetails from "../../../hooks/hotel/useHotelDetails"

export default function TopGallery({ images }) {
  const { hotelQuery } = useHotelDetails()
  const { data: hotel } = hotelQuery

  const mainImage = hotel.hotel_images.find(
    image => image.is_primary === true
  )

  return (
    <div className="grid grid-cols-[3fr_1.5fr] gap-2">
      <div className="overflow-hidden rounded-md">
        <img src={mainImage?.url} alt={mainImage?.image_name} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex-1 overflow-hidden rounded-md">
          <img src={images[1]} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="flex-1 overflow-hidden rounded-md">
          <img src={images[2]} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  )
}