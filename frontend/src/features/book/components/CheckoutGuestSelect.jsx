import clsx from "clsx"

export default function CheckoutGuestSelect(props) {
    const {
        label,
        required,
        defaultValue,
        options,
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

            <select
                defaultValue={defaultValue}
                className={clsx(
                    "w-full rounded-md border border-gray-400 px-3 py-3 outline-none",
                    "focus:border-blue-500",
                    className
                )}
                {...restProps}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}