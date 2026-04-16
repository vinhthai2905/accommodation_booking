import { clsx } from "clsx"

import Spinner from "../../components/layout/Spinner"

export default function ButtonSpinner({isLoading, submitText}) {
    return (
        <button
            type="submit"
            className={clsx(
                "flex justify-center",
                "w-full mt-6 px-4 py-3",
                "font-medium text-white",
                "rounded bg-[#006ce4]",
                "hover:bg-[#0057c2] hover:cursor-pointer",
                isLoading && "cursor-not-allowed opacity-70 hover:bg-[#006ce4]"
            )}
            disabled={isLoading}
        >
            {isLoading ? <Spinner className="mr-2 h-5 w-5" /> : submitText}
        </button>
    )
}