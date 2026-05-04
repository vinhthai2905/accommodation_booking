import { BedDouble } from "lucide-react"

export default function BookingCardImage({ hotel }) {
    return (
        <div className="shrink-0 w-60 overflow-hidden bg-gray-100">
            {hotel?.primary_image
                ? (
                    <img
                    src={hotel.primary_image}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                )
                : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
                        <BedDouble size={36} className="text-blue-300" />
                    </div>
                )}
        </div>
    )
}