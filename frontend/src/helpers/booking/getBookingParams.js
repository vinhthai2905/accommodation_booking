import { getChildrenAgeParams } from "./getChildrenAgeParams"

export const getBookingParams = (searchParams) => {
    const bookingParams = {
        slug: searchParams.get("slug") || "",
        hotelId: searchParams.get("hotel_id") || "",
        checkIn: searchParams.get("check_in") || "",
        checkOut: searchParams.get("check_out") || "",
        rooms: searchParams.get("rooms") || 1,
        adults: searchParams.get("adults") || 1,
        children: searchParams.get("children"),
    }

    if (Number(searchParams.get("children")) >= 1)
        bookingParams["childrenAges"] = getChildrenAgeParams(searchParams)

    return bookingParams

}