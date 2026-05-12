import { clsx } from "clsx"

export default function DBRoomToolBarButton({ children }) {
    return (
        <button
            className={clsx(
                "flex w-full items-center justify-center gap-2 px-4 py-2.5",
                "rounded-lg border border-gray-300 bg-white",
                "text-sm font-medium text-gray-700",
                "transition-colors hover:bg-gray-50",
                "md:w-auto cursor-pointer"
            )}
        >
            {children}
        </button>
    )
}
