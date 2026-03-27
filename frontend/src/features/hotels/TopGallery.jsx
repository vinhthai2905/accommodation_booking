export default function TopGallery({ images }) {
  return (
    <div className="grid grid-cols-2 gap-2 h-50">
      <div className="h-50 overflow-hidden rounded-md">
        <img src={images[0]} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="flex h-50 flex-col gap-2">
        <div className="flex-1 overflow-hidden rounded-md">
          <img src={images[1]} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="flex-1 overflow-hidden rounded-md">
          <img src={images[2]} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  )
}