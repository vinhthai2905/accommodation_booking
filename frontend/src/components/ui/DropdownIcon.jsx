import { ChevronDown } from "lucide-react"

export default function DropdownIcon() {
    return (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
            <ChevronDown size={16} strokeWidth={2} />
        </div>
    )
}