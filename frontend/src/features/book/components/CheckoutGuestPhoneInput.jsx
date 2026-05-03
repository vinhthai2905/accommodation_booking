import clsx from "clsx"

export default function CheckoutGuestPhoneInput({
    register,
    codeDefaultValue,
    codeOptions,
    placeholder,
    className,
}) {
    return (
        <div>
            <div className="flex gap-3">
                <select
                    defaultValue={codeDefaultValue}
                    className={clsx(
                        "w-23 rounded-md border border-gray-400 px-3 py-2 outline-none",
                        "focus:border-blue-500"
                    )}>
                    {codeOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <input
                    {...register}
                    type="tel"
                    placeholder={placeholder}
                    className={clsx(
                        "flex-1 rounded-md border border-gray-400 px-3 outline-none",
                        "focus:border-blue-500",
                        className
                    )}
                />
            </div>
        </div>
    )
}