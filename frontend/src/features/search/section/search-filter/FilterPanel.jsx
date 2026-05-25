import MapCard from "../../components/search-map/MapCard";

const roomAmenities = [
    { label: "Nhìn ra biển", count: 166 },
    { label: "Ban công", count: 379 },
    { label: "Phòng tắm riêng", count: 650 },
    { label: "Khu vực bếp", count: 375 },
    { label: "Điều hòa không khí", count: 676 },
    { label: "Sân hiên", count: 217 },
    { label: "Tầm nhìn ra khung cảnh", count: 584 },
    { label: "Máy giặt", count: 257 },
    { label: "Hồ bơi riêng", count: 94 },
    { label: "Bếp nhỏ", count: 276 },
    { label: "Áo choàng tắm", count: 90 },
    { label: "Đồ ăn nhẹ buổi tối và thức uống miễn phí ở executive lounge", count: 4 },
    { label: "Hồ bơi nước mặn", count: 11 },
    { label: "Thiết bị chơi game", count: 8 },
    { label: "TV màn hình phẳng", count: 620 },
    { label: "Máy vi tính", count: 10 },
    { label: "Máy pha cà phê/trà", count: 574 },
    { label: "Hồ bơi vô cực", count: 41 },
    { label: "Máy fax", count: 10 },
    { label: "Tủ lạnh", count: 472 },
    { label: "Trò chơi điện tử", count: 9 },
    { label: "Hồ bơi trên sân thượng", count: 74 },
    { label: "đọc sách", count: 6 }
];

export default function FilterPanel() {
    return (
        <div className="flex flex-col gap-1">
            <MapCard />
            <div>
                <div className="w-65 border border-gray-300 rounded-sm overflow-hidden text-sm">

                    {/* Header */}
                    <div className="p-4 border-b border-gray-300">
                        <h3 className="font-bold text-base text-gray-950">
                            Chọn lọc theo:
                        </h3>
                    </div>

                    {/* Section 1 */}
                    <div className="p-4 border-b border-gray-300">
                        <p className="font-semibold mb-3 text-gray-900">Tiện nghi khách sạn</p>

                        <div className="flex flex-col gap-3">
                            {roomAmenities.map((item, index) => (
                                <label key={index} className="flex items-start gap-2 cursor-pointer text-gray-700 hover:text-black">
                                    <input type="checkbox" className="mt-1 shrink-0" />
                                    <span className="flex-1 leading-tight">{item.label}</span>
                                    <span className="text-gray-500 text-xs self-start mt-0.5 shrink-0">{item.count}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Section 2 */}
                    {/* <div className="p-4">
                        <h3 className="font-semibold mb-3">
                            Guest's rating
                        </h3>

                        <div className="flex flex-col gap-3">

                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="flex-1">Excellent: 9 points or more</span>
                                <span className="text-gray-500">808</span>
                            </label>

                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="flex-1">Very good: 8 points or more</span>
                                <span className="text-gray-500">1896</span>
                            </label>

                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="flex-1">Good: 7 points or more</span>
                                <span className="text-gray-500">2629</span>
                            </label>

                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="flex-1">Pleasant: 6 points or more</span>
                                <span className="text-gray-500">2996</span>
                            </label>

                        </div>
                    </div> */}

                </div>
            </div>
            
        </div>
    )
}