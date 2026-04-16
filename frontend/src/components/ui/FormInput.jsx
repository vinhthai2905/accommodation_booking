import { clsx } from "clsx"

export default function FormInput({ register, idFor, type, labelFor, placeHolderFor, error }) {
    return (
        <div className={clsx(
            "text-black"
        )}>
            <fieldset className="rounded border border-[#949494] px-4 pb-3 pt-1">
                <legend className="px-1 text-[0.75rem] font-medium text-[#1a1a1a]">
                    {labelFor} <span className="text-red-500">(*)</span>
                </legend>

                <input
                    {...register}
                    id={idFor}
                    type={type}
                    placeholder={placeHolderFor}
                    className={clsx(
                        "w-full border-none bg-transparent px-0 py-0",
                        "text-sm outline-none",
                        
                    )}
                />
            </fieldset>

            {error && (
                <p className="my-5 text-sm text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    )
}