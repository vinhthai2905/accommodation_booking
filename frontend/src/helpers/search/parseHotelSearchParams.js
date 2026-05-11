import format from "date-fns/format"

export const parseHotelSearchParams = (location, bookingRanges, guestOptions) => {
    const params = new URLSearchParams({
        check_in: format(bookingRanges[0].startDate, "dd-MM-yyyy"),
        check_out: format(bookingRanges[0].endDate, "dd-MM-yyyy"),
        location: location,
        rooms: guestOptions.rooms,
        adults: guestOptions.adults,
        children: guestOptions.children,
    })

    if (guestOptions.children >= 1) {
        guestOptions.childrenAge.forEach(age => {
            if (age === undefined)
                return
            params.append("age", age)
        });
    }


    return params
}