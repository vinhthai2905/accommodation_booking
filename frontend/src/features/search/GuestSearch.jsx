import { clsx } from "clsx"

export default function GuestSearch({ guestOptions, setGuestOptions, onDone }) {
    const handleGuestOption = (optionKey, operation) => {
        setGuestOptions((prev) => {
            let newValue = operation === "increase" ? prev[optionKey] + 1 : prev[optionKey] - 1

            return {
                ...prev,
                [optionKey]: newValue,
            }
        })
    }

    return (
        <div className={clsx(
            "absolute top-full left-0 mt-3 text-black",
            "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.15)] rounded-lg p-6",
            "flex flex-col z-50 cursor-default"
        )}>
            <div className="flex flex-col gap-6">
                {/* Adults Row */}
                <div className="flex justify-between items-center gap-2">
                    <span className="text-sm text-gray-800">Adults</span>
                    <div className="flex items-center justify-between border border-gray-400 rounded w-32 px-4 py-1.5">
                        <button
                            type="button"
                            className={clsx(
                                "text-2xl leading-none pb-1",
                                guestOptions.adults <= 1 ? "text-gray-300 cursor-not-allowed" : "text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                            )}
                            onClick={() => handleGuestOption("adults", "decrease")}
                            disabled={guestOptions.adults <= 1}
                        >
                            &#8722;
                            {/* decrease guest by 1 */}
                        </button>
                        <span className="text-sm">{guestOptions.adults}</span>
                        <button
                            type="button"
                            className="text-2xl leading-none pb-1 text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                            onClick={() => handleGuestOption("adults", "increase")}
                        >
                            &#43;
                            {/* increment guest by 1 */}
                        </button>
                    </div>
                </div>

                {/* Rooms Row */}
                <div className="flex justify-between items-center gap-2">
                    <span className="text-sm text-gray-800">Rooms</span>
                    <div className="flex items-center justify-between border border-gray-400 rounded w-32 px-4 py-1.5">
                        <button
                            type="button"
                            className={clsx(
                                "text-2xl leading-none pb-1",
                                guestOptions.rooms <= 1 ? "text-gray-300 cursor-not-allowed" : "text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                            )}
                            onClick={() => handleGuestOption("rooms", "decrease")}
                            disabled={guestOptions.rooms <= 1}
                        >
                            &#8722;
                        </button>
                        <span className="text-sm">{guestOptions.rooms}</span>
                        <button
                            type="button"
                            className="text-2xl leading-none pb-1 text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                            onClick={() => handleGuestOption("rooms", "increase")}
                        >
                            &#43;
                        </button>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={onDone}
                className="w-full mt-6 py-2 border border-blue-600 text-blue-600 rounded font-medium hover:bg-blue-50 transition-colors"
            >
                Done
            </button>
        </div>
    )
}
