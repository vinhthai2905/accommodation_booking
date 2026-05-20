import { clsx } from "clsx"
import { Link } from "react-router"

export default function DBRoomTypeToolBarButton({ children, to}) {
    return (
        <Link
            to={to}
            className={clsx(
                "flex w-full items-center justify-center gap-2 px-4 py-2.5",
                "rounded-lg border",
                "text-sm font-medium",
                "transition-colors",
                "md:w-auto",
            )}
        >
            {children}
        </Link>
    )
}