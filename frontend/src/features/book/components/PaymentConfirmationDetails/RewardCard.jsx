import RewardItem from "./RewardItem"

import { Car } from "lucide-react"

export default function RewardsCard() {
    return (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base leading-tight">
                    Dùng tặng thưởng bạn đã nhận
                </h3>
                <button type="button" className="text-slate-400 hover:text-slate-600">
                    <span className="text-lg">ⓘ</span>
                </button>
            </div>

            <div className="mt-4 space-y-4">
                <RewardItem
                    icon={<Car size={22} className="text-slate-600" />}
                    title="Miễn phí taxi sân bay"
                    description="Bạn được một chuyến taxi sân bay miễn phí với đặt phòng chỗ nghỉ ở Đà Nẵng!"
                />
                <div className="border-t border-gray-100" />
                <RewardItem
                    icon={<Car size={22} className="text-slate-600" />}
                    title="Thuê xe"
                    badge="-5%"
                    description="Có lựa chọn hủy miễn phí. Để cảm ơn bạn đã đặt chỗ nghỉ, bạn được ưu đãi 5% cho tất cả xe thuê"
                />
            </div>
        </div>
    )
}