import { FaUserFriends } from "react-icons/fa"

export default function RoomGuests({ room }) {
    return (
        <div className="border-l border-blue-300 p-4">
            <div className="flex gap-1 text-black">
                {Array.from({ length: room.guests }).map((_, index) => (
                    <FaUserFriends key={index} className="text-lg" />
                ))}
            </div>
        </div>
    )
}