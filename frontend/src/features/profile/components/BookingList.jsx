import BookingCard from "./BookingCard"

export default function BookingList({ filteredBooking, motion }) {
    return (
        <div className="flex flex-col gap-4">
            {
                filteredBooking.map((booking, i) => (
                    <BookingCard
                        key={booking.id_booking}
                        booking={booking}
                        index={i}
                        motion={motion}
                    />
                ))
            }
        </div>
    )
}