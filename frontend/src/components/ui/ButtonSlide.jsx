import { clsx } from "clsx"

export default function ButtonSlide({ direction, scrollFunc }) {
    return (
        <button
            onClick={scrollFunc}
            className={clsx(
                "absolute top-1/2 -translate-y-20 z-10 w-10 h-10 bg-white rounded-full shadow",
                "hover:bg-[#f5f5f5] hover:cursor-pointer",
                direction === "left" && "left-0",
                direction === "right" && "right-0"
            )}
        >
            {direction === "left" ? "<" : ">"}
        </button>
    )
}