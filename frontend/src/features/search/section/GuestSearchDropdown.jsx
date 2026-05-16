import { clsx } from "clsx"

import GuestCounterInput from "../components/GuestCounterInput"
import ChildrenAgeSearch from "../components/ChildrenAgeSearch"

export default function GuestSearchDropdown({ guestOptions, setGuestOptions, onDone, setIsAgeInputError, isAgeInputError }) {
    const handleGuestOptions = (optionKey, operation) => {
        setGuestOptions((prevGuestOptions) => {
            let newValue = operation === "increase" ? prevGuestOptions[optionKey] + 1 : prevGuestOptions[optionKey] - 1

            return {
                ...prevGuestOptions,
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
                <GuestCounterInput label="Người lớn" optionKey="adults" handleGuestOptions={handleGuestOptions} guestOptions={guestOptions} />

                {/* Children Row */}
                <GuestCounterInput label="Trẻ em" optionKey="children" handleGuestOptions={handleGuestOptions} guestOptions={guestOptions} />

                {/* Children Age Inputs */}
                <ChildrenAgeSearch
                    childrenCount={guestOptions.children}
                    setGuestOptions={setGuestOptions}
                    guestOptions={guestOptions}
                    setIsAgeInputError={setIsAgeInputError}
                    isAgeInputError={isAgeInputError}
                />

                {/* Rooms Row */}
                <GuestCounterInput label="Phòng" optionKey="rooms" handleGuestOptions={handleGuestOptions} guestOptions={guestOptions} />
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
