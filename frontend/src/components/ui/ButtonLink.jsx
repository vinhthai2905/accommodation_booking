import { clsx } from "clsx"

import { Link } from "react-router"

export default function ButtonLink({ title, to }) {
    return (
        <Link to={to} className={clsx(
            "bg-white",
            "p-1 rounded-sm",
            "hover:bg-black hover:cursor-pointer"
        )}>
            <span className="text-[rgb(0,108,228)]">
                {title}
            </span>
        </Link>
    )
}