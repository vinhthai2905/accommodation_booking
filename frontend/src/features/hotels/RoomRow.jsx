import RoomDetails from "./RoomDetails"
import RoomGuests from "./RoomGuests"

export default function RoomRow({ room }) {
    return (
        <div className="grid grid-cols-[1.8fr_0.5fr_0.8fr] border-t border-gray-300">
            <RoomDetails room={room} />
            <RoomGuests room={room} />

            <div className="border-l border-blue-300 p-4">
                <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Hiển thị giá
                </button>
            </div>
        </div>
    )
}