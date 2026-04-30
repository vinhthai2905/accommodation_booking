import { clsx } from "clsx"

import GuestCounterInput from "../components/GuestCounterInput"
import ChildrenAgeSearch from "../components/ChildrenAgeSearch"

export default function GuestSearchDropdown({ guestOptions, setGuestOptions, onDone }) {
    const handleGuestOptions = (optionKey, operation) => {
        setGuestOptions((prevGuestOptions) => {
            let newValue = operation === "increase" ? prevGuestOptions[optionKey] + 1 : prevGuestOptions[optionKey] - 1

            // if (optionKey === "children" && operation === "increase") {
            //     // let childrenLength = prevGuestOptions.childrenAge.length
            //     return {
            //         ...prevGuestOptions,
            //         [optionKey]: newValue,
            //         childrenAge: {
            //             ...prevGuestOptions.childrenAge,
            //             [prevGuestOptions.children + 1]: null,
            //         },
            //     }
            // }

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
                <ChildrenAgeSearch childrenCount={guestOptions.children} setGuestOptions={setGuestOptions} guestOptions={guestOptions} />

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
