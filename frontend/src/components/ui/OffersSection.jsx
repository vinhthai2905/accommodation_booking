import OfferCard from "./OfferCard"

export default function OffersSection() {
    return (
        <div className="py-8">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-neutral-900">Offers</h2>
                <p className="mt-1 text-lg text-gray-600">
                    Special offers, discounts and special offers for you
                </p>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <OfferCard
                        eyebrow="Ưu đãi đầu năm 2026"
                        title="Giảm giá ít nhất 15%"
                        description="Tiết kiệm cho kỳ nghỉ tiếp theo của bạn với ưu đãi đầu năm 2026. Đặt ngay, lưu trú linh hoạt đến 01/04/2026."
                        buttonText="Khám phá ưu đãi"
                        image="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop"
                    />

                    <OfferCard
                        eyebrow="Tiết kiệm hơn với ưu đãi mùa du lịch"
                        title="Không ràng buộc. An tâm nghỉ ngơi."
                        description="Giảm ít nhất 15% tại nhiều chỗ nghỉ trên toàn thế giới – đặt ngay hôm nay."
                        buttonText="Tiết kiệm ngay"
                        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
                    />
                </div>
            </div>
        </div>
    )
}