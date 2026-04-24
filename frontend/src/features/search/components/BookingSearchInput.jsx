import { clsx } from "clsx"

import DropdownIcon from "../../../components/ui/DropdownIcon"

export default function BookingSearchInput({ name, inputFor, ref, icon: Icon, onClick, onChange, value, children }) {
    return (
        <div
            search-input={"booking-search-input"}
            className={clsx(
                "relative",
                "flex gap-2",
                "px-3 py-2",
                "border-x-3 border-orange-300 rounded-md bg-white",
                "xl:border-y-4 xl:flex-1",
                "md:border-y-2 md:py-4",
            )}
            ref={ref}
        >
            <div className="flex items-center text-black">
                {Icon && <Icon size={20} strokeWidth={2} />}
            </div>
            <input
                className={clsx(
                    "w-full text-sm text-black placeholder:text-black",
                    "focus: outline-0",
                    name !== "location" && "caret-transparent"
                )}
                name={name}
                placeholder={name === "location" ? "Khu vực bạn muốn ở" : undefined}
                onClick={onClick}
                type={inputFor}
                value={value}
                onChange={onChange}
                // readOnly
            />
            {children}

            {name === "guestOption" ? <DropdownIcon /> : undefined}

        </div>
    )
}
