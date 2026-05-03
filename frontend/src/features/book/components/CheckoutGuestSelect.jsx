import { ChevronDown } from "lucide-react"

import { clsx } from "clsx"

export default function CheckoutGuestSelect(props) {
    const {
        className,
        register,
        label,
        required,
        defaultValue,
        options,
    } = props

    return (
        <div>
            <label className="mb-2 block text-slate-900">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="relative">
                <select
                    {...register}
                    defaultValue={defaultValue}
                    className={clsx(
                        "w-full rounded-md border border-gray-400 px-3 py-3 pr-10 outline-none",
                        "focus:border-blue-500 appearance-none",
                        className
                    )}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                />
            </div>
        </div>
    )
}