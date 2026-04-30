import { FaBed, FaCouch, FaChevronRight } from "react-icons/fa"

function getDetailIcon(detail) {
    if (detail.toLowerCase().includes("sofa")) {
        return <FaCouch className="inline ml-1 text-sm text-gray-700" />
    }

    return <FaBed className="inline ml-1 text-sm text-gray-700" />
}

export default function RoomDetailsColumn({ roomType }) {
    return (
        <div className="p-4">
            <div className="flex items-start gap-2">
                <FaChevronRight className="mt-1 text-sm text-orange-500" />
                <div>
                    <a
                        href="#"
                        className="font-bold text-blue-700 underline hover:text-blue-900"
                    >
                        {roomType.type_name}
                    </a>

                    {/* <div className="mt-2 space-y-1 text-sm text-gray-800">
                        {room.details.map((detail, index) => (
                            <div key={index}>
                                {detail}
                                {getDetailIcon(detail)}
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    )
}