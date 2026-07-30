import { useParams, useSearchParams } from "react-router"

export default function useBookingNavigation() {
    const { slug, uuid: hotelID } = useParams()
    const [searchParams] = useSearchParams()

    const bookingSearchParams = new URLSearchParams({
        slug: slug || "",
        hotel_id: hotelID || "",
        check_in: searchParams.get("check_in") || "",
        check_out: searchParams.get("check_out") || "",
        rooms: searchParams.get("rooms") || "",
        adults: searchParams.get("adults") || "",
        children: searchParams.get("children"),
    })

    if (Number(searchParams.get("children")) >= 1) {
        searchParams.getAll("age").forEach(age => {
            bookingSearchParams.append("age", age)
        })
    }

    return {
        bookingSearchParams
    }
}