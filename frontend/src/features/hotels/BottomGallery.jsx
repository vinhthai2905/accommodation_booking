export default function BottomGallery({ images }) {
    return (
        <div className="flex gap-2">
            {images.map((img, index) => (
                <div key={index} className="flex-1 overflow-hidden rounded-md relative">
                    <img src={img} alt="" className="h-full w-full object-cover" />

                    {index === images.length - 1 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/35 text-lg font-semibold text-white">
                            +158 ảnh
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}