import { getChildrenAgeParams } from "./getChildrenAgeParams"

export const getCheckoutParams = (searchParams) => {
    const checkoutParams = {
        hotelId: searchParams.get("hotel_id") || "",
        checkIn: searchParams.get("check_in") || "",
        checkOut: searchParams.get("check_out") || "",
        adults: searchParams.get("adults") || 1,
        children: searchParams.get("children"),
    }

    if (Number(searchParams.get("children")) >= 1) {
        checkoutParams["childrenAges"] = getChildrenAgeParams(searchParams)

    }

    return checkoutParams
}