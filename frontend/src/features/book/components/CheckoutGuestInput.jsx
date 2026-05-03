import clsx from "clsx"
import ErrorValidation from "../../../components/ui/ErrorValidation"
import { getFieldBorderClass } from "../../../utils/getFieldErrorBorder"

export default function CheckoutGuestInput({
    register,
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
                    getFieldBorderClass(error)
                )}
            />

            {error && (
                <ErrorValidation message={error.message} />
            )}
        </div>
    )
}