import clsx from "clsx"

export default function CheckoutGuestPhoneInput(props) {
    const {
        label,
        required,
        codeDefaultValue,
        codeOptions,
        placeholder,
        className,
        ...restProps
    } = props

    return (
        <div>
            {label && (
                <label className="mb-2 block text-slate-900">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="flex gap-3">
                <select
                    defaultValue={codeDefaultValue}
                    className={clsx(
                        "w-23 rounded-md border border-gray-400 px-3 py-2 outline-none",
                        "focus:border-blue-500"
                    )}
                >
                    {codeOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <input
                    type="tel"
                    placeholder={placeholder}
                    className={clsx(
                        "flex-1 rounded-md border border-gray-400 px-3 outline-none",
                        "focus:border-blue-500",
                        className
                    )}
                    {...restProps}
                />
            </div>
        </div>
    )
}