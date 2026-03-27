import { clsx } from "clsx"

import { Link } from "react-router"

export default function HomeIcon() {
    return (
        <div className={clsx(
            "flex items-center"
        )}>
            <Link 
                className={clsx(
                "hover:font-black hover:cursor-pointer"
            )}
                to={"/"}
            >
                <span className={clsx(
                    "text-white font-bold hover:underline"
                )}>
                    Booking.com
                </span>
            </Link>
        </div>

    )
}