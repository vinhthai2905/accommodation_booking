import { clsx } from "clsx"
import { ChevronDown } from "lucide-react"

export default function ChildAgeInput({ index, setGuestOptions }) {
    const handleAddChildAge = (age) => {
        setGuestOptions((prev) => ({
                ...prev,
                childrenAge: {
                    ...prev.childrenAge,
                    [`child_${index}_age`]: age
                }
            })
        )
    }

    return (
        <div className="relative inline-block w-32.5"
            ageinput={"child-age-input"}
        >
            <select
                className={clsx(
                    "w-full text-black text-sm",
                    "border border-gray-400 rounded-md",
                    "py-2 pl-3 pr-8",
                    "appearance-none bg-white",
                    "focus:outline-none focus:ring-1 focus:ring-blue-500",
                    "cursor-pointer"
                )}
                name="childAge"
                id="childAge"
            >
                <option key={-1} value={-1}>Chọn tuổi</option>
                {
                    Array.from({ length: 18 }, (_, i) => i).map((age) => {
                        return (
                            <option
                                key={age}
                                value={age}
                                onClick={() => handleAddChildAge(age)}
                            >
                                {age} tuổi
                            </option>
                        )
                    })
                }
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                <ChevronDown size={16} strokeWidth={2} />
            </div>
        </div>
    )
}