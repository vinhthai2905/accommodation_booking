import { clsx } from "clsx"

import GuestCounterInput from "../components/GuestCounterInput"
import ChildrenAgeSearch from "../components/ChildrenAgeSearch"

export default function GuestSearchDropdown({ guestOptions, setGuestOptions, onDone }) {
    const handleGuestOptions = (optionKey, operation) => {
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
            <div className={clsx(
                "flex flex-col gap-6"
            )}>
                {/* Adults Row */}
                <GuestCounterInput guestKey="adults" handleGuestOptions={handleGuestOptions} guestOptions={guestOptions} />

                {/* Children Row */}
                <GuestCounterInput guestKey="children" handleGuestOptions={handleGuestOptions} guestOptions={guestOptions} />

                {/* Children Age Inputs */}
                <ChildrenAgeSearch childrenCount={guestOptions.children} setGuestOptions={setGuestOptions}/>

                {/* Rooms Row */}
                <GuestCounterInput guestKey="rooms" handleGuestOptions={handleGuestOptions} guestOptions={guestOptions} />
            </div>

            <button
                type="button"
                onClick={onDone}
                className={clsx(
                    "w-full mt-6 py-2",
                    "border border-blue-600 rounded font-medium",
                    "text-blue-600",
                    "transition-colors",
                    "hover:bg-blue-50"
                )}
            >
                Done
            </button>
        </div>
    )
}
