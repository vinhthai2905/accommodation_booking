import { clsx } from "clsx"
import ViewToggleButton from "/src/components/ui/ViewToggleButton"

export default function ViewToggle() {
    return (
        <div className={clsx(
            "h-[50%] inline-flex items-center",
            "rounded-full border border-gray-300",
            "bg-gray-100 p-1"
        )}>

            <ViewToggleButton label="View horizontal" />
            <ViewToggleButton label="View along" />
        </div>
    )
}