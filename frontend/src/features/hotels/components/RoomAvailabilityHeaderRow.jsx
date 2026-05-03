import { clsx } from "clsx"

export default function RoomAvailabilityHeaderRow() {
    return (
        <>
            <div className={clsx(
                "px-4 py-2 font-bold"
            )}>
                Loại chỗ ở
            </div>

            <div className={clsx(
                "border-l border-blue-300",
                "px-4 py-2 font-bold"
            )}>
                Số lượng khách
            </div>
            
            <div className={clsx(
                "border-l border-blue-300",
                "px-4 py-2 font-bold"
            )}
            >
                Giá phòng
            </div>

            <div className={clsx(
                "border-l border-blue-300",
                "px-4 py-2 font-bold"
            )}
            >
                Chọn phòng
            </div>

        </>
    )
}