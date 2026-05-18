import { clsx } from "clsx"

export default function ErrorLocationInput() {
    return (
        <div className={clsx(
            "absolute top-[calc(100%+8px)] left-0 z-50",
            "px-4 py-2 text-sm text-white whitespace-nowrap",
            "bg-[rgb(204,0,0)] rounded shadow-md",
        )}>
            <div className={clsx(
                "absolute bottom-full left-6 -ml-2",
                "w-0 h-0",
                "border-x-8 border-x-transparent",
                "border-b-8 border-b-[rgb(204,0,0)]",
            )} />
            Enter a destination to start searching.
        </div>
    )
}