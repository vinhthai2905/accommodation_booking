import { clsx } from "clsx"

export const inputBaseStyles = clsx(
    "text-black w-full px-4 py-3",
    "border border-blue-500 rounded-lg",
    "outline-none bg-transparent"
)

export const rowStyles = clsx(
    "py-5 flex flex-col sm:flex-row",
    "gap-4 border-b border-gray-200"
)

export const labelStyles = clsx(
    "absolute -top-2 left-2 bg-white px-1",
    "text-xs text-slate-500 font-medium"
)

export const saveBtnStyles = clsx(
    "bg-blue-600 hover:bg-blue-700 text-white",
    "px-5 py-2 rounded-lg font-medium",
    "shadow-sm transition-colors cursor-pointer"
)

export const actionBtnStyles = clsx(
    "text-blue-600 hover:text-blue-700 font-medium",
    "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
)