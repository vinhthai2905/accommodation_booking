import clsx from "clsx"
import { useState, useEffect } from "react"

export default function AnimatedLandingText() {
    const texts = ["khách sạn", "bất cứ chỗ nghỉ nào"]
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % texts.length)
        }, 3000)

        return () => clearInterval(interval)
    })

    return (
        <h1 className={clsx(
            "text-white font-bold",
            "text-6xl leading-tight",
            "flex flex-col"
        )}>
            Đăng

            <div>
                <span className={clsx(
                    "block relative",
                    "h-20",
                    "text-[#1a9df4]"
                )}>
                    {texts.map((text, i) => (
                        <span
                            key={text}
                            className={clsx(
                                "absolute left-0 top-0",
                                "transition-all duration-500",
                                i === index
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-2"
                            )}>
                            {text}
                        </span>
                    ))}
                </span>
            </div>

            <div>
                <span className="block">của Quý vị trên</span>
                <span className="block">Booking.com</span>
            </div>
        </h1>
    )
}