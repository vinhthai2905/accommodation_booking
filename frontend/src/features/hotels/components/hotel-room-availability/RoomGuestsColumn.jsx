import { FaUserFriends } from "react-icons/fa"

export default function RoomGuestsColumn({ roomType }) {
    return (
        <div className="px-4 py-3 flex items-start">
            <div className="flex flex-wrap gap-1 text-slate-400">
                {Array.from({ length: roomType.max_capacity }).map((_, index) => (
                    <FaUserFriends key={index} className="text-base" />
                ))}
            </div>
        </div>
    )
}