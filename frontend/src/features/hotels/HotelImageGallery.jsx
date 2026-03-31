import TopGallery from "./TopGallery"
import BottomGallery from "./BottomGallery"

const images = [
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=900&auto=format&fit=crop",
]

const topImages = images.slice(0, 3)
const bottomImages = images.slice(3)

export default function HotelImageGallery() {
    return (
        <div className="flex flex-col w-[80%] gap-2 text-black">
            <TopGallery images={topImages}/>
            <BottomGallery images={bottomImages}/>
        </div>
    )
}