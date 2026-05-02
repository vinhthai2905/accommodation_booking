import clsx from "clsx"

export default function CheckoutGuestInput({
    register,
    className,
    label,
    type = "text",
    placeholder,
    defaultValue,
    error
}) {
    return (
        <div>
            <label className="mb-2 block text-slate-900">
                {label} <span className="text-red-500">*</span>
            </label>

            <input
                {...register}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={clsx(
                    "w-full rounded-md border px-3 py-3 outline-none",
                    error 
                        ? "border-red-600 focus:border-red-600" 
                        : "border-gray-400 focus:border-blue-500",
                    className
                )}
            />

            {error && (
                <p className="mt-1.5 text-sm text-red-600 font-medium">
                    {error.message}
                </p>
            )}
        </div>
    )
}