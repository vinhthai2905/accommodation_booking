import { clsx } from "clsx"

export default function FormInput({ register, idFor, type, labelFor, placeHolderFor, error }) {
    return (
        <div className={clsx(
            "text-black"
        )}>
            <label
                htmlFor={idFor}
                className="mb-2 block font-medium text-[#1a1a1a]"
            >
               {labelFor} <span className="text-red-500">(*)</span>
            </label>
            <input
                {...register}
                id={idFor}
                type={type}
                placeholder={placeHolderFor}
                className={clsx(
                    "w-full px-4 py-3",
                    "rounded border border-[#949494]",
                    "text-sm",
                    "outline-none",
                    "focus:border-[#006ce4] hover:border-[#006ce4]",
                    error && "border-red-600"
                )}
            />

            {error && (
                <p className="my-5 text-sm text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    )
}