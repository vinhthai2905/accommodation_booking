import { clsx } from "clsx"
import { ChevronDown } from "lucide-react"

export default function ChildAgeInput({ index, setGuestOptions, guestOptions, setIsAgeInputError, isAgeInputError }) {
    const handleAddChildAge = (age) => {
        setGuestOptions((prevOption) => {
            const newChildrenAge = [...(prevOption.childrenAge || [])]
            newChildrenAge[index] = age

            const newGuestOptions = {
                ...prevOption,
                childrenAge: newChildrenAge
            }

            if (newGuestOptions.children === newGuestOptions.childrenAge) {
                setIsAgeInputError(false)
            }

            return newGuestOptions
        }
        )
    }

    const selectedAge = guestOptions.childrenAge[index] ?? -1
    const hasAgeError = selectedAge === -1

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
                    "cursor-pointer",
                    hasAgeError && isAgeInputError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-400 focus:ring-blue-500"
                )}
                name="childAge"
                id="childAge"
                value={guestOptions.childrenAge[index] >= 0 ? guestOptions.childrenAge[index] : -1}
                onChange={(e) => handleAddChildAge(Number(e.target.value))}
            >
                <option key={-1} value={-1}>Chọn tuổi</option>
                {
                    Array.from({ length: 18 }, (_, i) => i).map((age) => {
                        return (
                            <option
                                key={age}
                                value={age}
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