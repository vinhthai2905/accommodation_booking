import { clsx } from "clsx"

export default function GuestCounterInput({ guestKey, handleGuestOptions, guestOptions }) {
    return (
        <div className={clsx(
            "flex items-center justify-between gap-2"
        )}>
            <span className={clsx(
                "text-sm",
                "text-gray-800 capitalize"
            )}>{guestKey}</span>

            <div className={clsx(
                "flex items-center justify-between",
                "w-32 px-4 py-1.5",
                "border border-gray-400 rounded"
            )}>
                <button
                    type="button"
                    className={clsx(
                        "text-2xl leading-none pb-1",
                        guestOptions[guestKey] <= 1 ? "text-gray-300 cursor-not-allowed" : "text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                    )}
                    onClick={() => handleGuestOptions(guestKey, "decrease")}
                    disabled={guestOptions[guestKey] <= 1}
                    button-for={"decrement"}
                >
                    &#8722;
                    {/* decrease guest by 1 */}
                </button>
                <span
                    className={clsx(
                        "text-sm"
                    )}
                    data-guest-key={guestKey}
                >
                    {guestOptions[guestKey]}
                </span>
                <button
                    type="button"
                    className={clsx(
                        "pb-1",
                        "text-2xl leading-none",
                        "text-blue-500",
                        "hover:cursor-pointer hover:text-blue-700"
                    )}
                    onClick={() => handleGuestOptions(guestKey, "increase")}
                    button-for={"increment"}
                >
                    &#43;
                    {/* increment guest by 1 */}
                </button>
            </div>
        </div>
    )
}