import { clsx } from "clsx"

export default function BookingRoomInput({ inputInfo, path }) {
    return (
        <div className={clsx(
            "flex gap-2",
            "px-3 py-1",
            "border-x-3 border-orange-300 rounded-md bg-white",
            "xl:border-y-4 xl:flex-1",
            "md:border-y-2"
        )}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={"20px"} fill="black">
                    <path d={path}></path>
                </svg>
            </div>
            <input className={clsx(
                "text-sm text-black w-full",
                
            )} defaultValue={inputInfo} />
        </div>
    )
}