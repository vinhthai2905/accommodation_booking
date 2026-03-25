import { clsx } from "clsx"

export default function ButtonLink({ title }) {
    return (
        <a className={clsx(
            "bg-white",
            "p-1 rounded-sm",
            "hover:bg-black hover:cursor-pointer"
        )}>
            <span className="text-[rgb(0,108,228)]">
                {title}
            </span>
        </a>
    )
}