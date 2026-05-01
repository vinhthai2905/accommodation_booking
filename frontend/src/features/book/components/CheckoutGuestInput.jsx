import clsx from "clsx"

export default function CheckoutGuestInput({
    label,
    required = false,
    type = "text",
    placeholder = "",
    className,
}) {
    return (
        <div>
            <label className="mb-2 block text-slate-900">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                className={clsx(
                    "w-full rounded-md border border-gray-400 px-3 py-3 outline-none",
                    "focus:border-blue-500",
                    className
                )}
            />
        </div>
    )
}