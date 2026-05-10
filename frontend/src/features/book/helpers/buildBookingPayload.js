export const buildBookingPayLoad = (data) => {
    const bookingPayload = {
        guestInfo: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            country: data.country,
            phoneNumber: data.phoneNumber,

        },
        hotelSelection: {
            hotelId: data.hotelId,
            roomIds: data.selectedRoomIds
        },
        guestBooking: {
            adults: data.adults,
            children: data.children,
            ...(data.children > 0 && {
                childrenAges: data.childrenAges
            }),
            checkIn: data.checkIn,
            checkOut: data.checkOut,
            checkInTime: data.checkInTime,
        }
    }

    if(data.note) 
        bookingPayload.guestBooking["note"] = data.note

    return bookingPayload
}