import { useParams, useSearchParams } from "react-router"
import format from "date-fns/format"

export default function useBookingNavigation() {
    const { slug, uuid: hotelID } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const bookingSearchParams = new URLSearchParams({
        slug: slug || "",
        hotel_id: hotelID || "",
        check_in: searchParams.get("check_in", "dd-MM-yyyy") || "",
        check_out: searchParams.get("check_out", "dd-MM-yyyy") || "",
        rooms: searchParams.get("rooms") || "",
    })


    return {
        bookingSearchParams,
    }
}