import format from "date-fns/format"

export const parseHotelSearchParams = (location, bookingRanges, guestOptions) => {
    const params = new URLSearchParams({
        checkIn: format(bookingRanges[0].startDate, "dd-MM-yyyy"),
        checkOut: format(bookingRanges[0].endDate, "dd-MM-yyyy"),
        location: location,
        rooms: guestOptions.rooms,
        adults: guestOptions.adults,
        ...(guestOptions.children >= 1 && {
            children: guestOptions.children,
        }),
    })

    if (guestOptions.children >= 1) 
        guestOptions.childrenAge.forEach(age => {
            params.append("age", age)
        });

    return params
}