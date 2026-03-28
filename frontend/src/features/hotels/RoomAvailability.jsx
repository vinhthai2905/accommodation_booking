import RoomRow from "./RoomRow"
import RoomAvailabilityHeader from "./RoomAvailabilityHeader"

const rooms = [
    {
        id: 1,
        name: "Studio Có Giường Cỡ King Và Giường Sofa",
        details: ["2 giường sofa", "1 giường đôi lớn"],
        guests: 3,
    },
    {
        id: 2,
        name: "Studio Có Giường Cỡ King Và Giường Sofa",
        details: ["1 giường đôi lớn"],
        guests: 2,
    },
    {
        id: 3,
        name: "Suite Nhìn Ra Thành Phố",
        details: ["1 giường đôi lớn"],
        guests: 2,
    },
    {
        id: 4,
        name: "Suite Nhìn Ra Thành Phố",
        details: ["1 giường đôi lớn"],
        guests: 2,
    },
    {
        id: 5,
        name: "Suite Có Giường Cỡ King",
        details: ["Phòng ngủ 1 giường đôi lớn", "Phòng khách 1 giường sofa"],
        guests: 2,
    },
    {
        id: 6,
        name: "Suite Nhìn Ra Thành Phố",
        details: ["Phòng ngủ 1 giường đôi cực lớn", "Phòng khách 1 giường sofa"],
        guests: 2,
    },
    {
        id: 7,
        name: "Suite Có Giường Cỡ King",
        details: ["1 giường đôi lớn"],
        guests: 2,
    },
    {
        id: 8,
        name: "Suite Nhìn Ra Thành Phố",
        details: ["1 giường đôi lớn"],
        guests: 2,
    },
    {
        id: 9,
        name: "Suite Có Giường Cỡ King",
        details: ["1 giường đôi cực lớn"],
        guests: 2,
    },
]

export default function RoomAvailability() {
    return (
        <div className="overflow-hidden rounded-md border border-gray-300 bg-white">
            <div className="grid grid-cols-[1.8fr_0.5fr_0.8fr] bg-[#4f79b6] text-white">
                <RoomAvailabilityHeader />
            </div>

            {rooms.map((room) => (
                <RoomRow key={room.id} room={room} />
            ))}
        </div>
    )
}