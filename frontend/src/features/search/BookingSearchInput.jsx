import { forwardRef } from "react"
import { clsx } from "clsx"

const BookingSearchInput = forwardRef(({ inputInfo, inputFor, path, onClick, value, onChange, children }, ref) => {
    return (
        <div className={clsx(
            "relative",
            "flex gap-2",
            "px-3 py-2",
            "border-x-3 border-orange-300 rounded-md bg-white",
            "xl:border-y-4 xl:flex-1",
            "md:border-y-2 md:py-4",
        )}
            ref={ref}
        >
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={"20px"} fill="black">
                    <path d={path}></path>
                </svg>
            </div>
            <input
                className={clsx(
                    "w-full text-sm text-black placeholder:text-black",
                    "focus: outline-0",
                )}
                placeholder={inputInfo}
                onClick={onClick}
                type={inputFor}
                value={value}
                onChange={onChange}
            />
            {children}
        </div>
    )
})

export default BookingSearchInput