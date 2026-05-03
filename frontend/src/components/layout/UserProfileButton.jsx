import { clsx } from "clsx"

import { useContext } from "react"

import { AuthUserContext } from "../../context/AuthUserContext"

export default function UserProfileButton({ userName, level, setIsOpen }) {
    return (
        <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={clsx(
                "flex items-center gap-2 text-left transition",
                "rounded-md px-2 py-1.5",
                "hover:bg-white/10 hover:cursor-pointer"
            )}
        >
            <div
                className={clsx(
                    "h-8 w-8 rounded-full border-2",
                    "flex items-center justify-center",
                    "border-yellow-400 bg-purple-500",
                    "text-sm font-medium text-white"
                )}
            >
            </div>

            <div className="leading-tight">
                <p className="text-sm font-semibold text-white">
                    {userName}
                </p>
                <p className="text-xs text-yellow-300">{level}</p>
            </div>
        </button>
    )
}