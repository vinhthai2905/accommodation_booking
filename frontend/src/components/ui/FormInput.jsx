import { clsx } from "clsx"

export default function FormInput({ idFor, type, labelFor, placeHolderFor }) {
    return (
        <div className={clsx(
            "text-black"
        )}>
            <label
                htmlFor={idFor}
                className="mb-2 block font-medium text-[#1a1a1a]"
            >
                {labelFor}
            </label>
            <input
                id={idFor}
                type={type}
                placeholder={placeHolderFor}
                className={clsx(
                    "w-full px-4 py-3",
                    "rounded border border-[#949494]",
                    "text-sm",
                    "outline-none",
                    "focus:border-[#006ce4]"
                )}
            />
        </div>
    )
}