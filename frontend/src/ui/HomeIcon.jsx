import { clsx } from "clsx"

export default function HomeIcon() {
    return (
        <div className={clsx(
            "flex items-center"
        )}>
            <a className={clsx(
                "hover:font-black hover:cursor-pointer"
            )}>
                <span className={clsx(
                    "text-white font-bold hover:underline"
                )}>
                    Booking.com
                </span>
            </a>
        </div>

    )
}