import { clsx } from "clsx"

import AnimatedLandingText from "/src/components/ui/AnimatedLandingText"

export default function HeroContent() {

    return (
        <div className={clsx(
            "w-[50%]",
            "pt-4"
        )}>
            <AnimatedLandingText />

            <p className={clsx(
                "max-w-175",
                "mt-8",
                "text-white text-[20px] leading-relaxed"
            )}>
                Đăng chỗ nghỉ trên một trong những ứng dụng du lịch được tải
                xuống nhiều nhất thế giới để tăng thu nhập nhanh hơn và mở
                rộng sang các thị trường mới.
            </p>
        </div>
    )
}