import clsx from "clsx"

export default function CheckoutGuestInput({
    className,
    label,
    type = "text",
    placeholder = "",
    required = false,
    defaultValue = ""
}) {
    return (
        <div>
            <label className="mb-2 block text-slate-900">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={clsx(
                    "w-full rounded-md border border-gray-400 px-3 py-3 outline-none",
                    "focus:border-blue-500",
                    className
                )}
            />
        </div>
    )
}