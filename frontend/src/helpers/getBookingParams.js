export const getBookingParams = (searchParams) => {
    return {
        slug: searchParams.get("slug") || "",
        hotelId: searchParams.get("hotel_id") || "",
        checkIn: searchParams.get("check_in") || "",
        checkOut: searchParams.get("check_out") || "",
        rooms: searchParams.get("rooms") || null,
        adults: searchParams.get("adults") || null,
        children: searchParams.get("children"),
    }
}