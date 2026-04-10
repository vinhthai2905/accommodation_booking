import clsx from "clsx"

import { useContext } from "react"

import { AuthContext } from "../../context/AuthContext"

export default function UserProfileBadge({
  level = "Genius Level 1",
  initials = "V",
}) {

  const authValue = useContext(AuthContext)

  return (
    <div>
      <button
        type="button"
        className={clsx(
          "flex items-center gap-2 text-left transition ",
          "rounded-md px-2 py-1.5",
          "hover:bg-white/10 hover:cursor-pointer"
        )}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-yellow-400 bg-purple-500 text-sm font-medium text-white">
          {initials}
        </div>

        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">{authValue.user.name}</p>
          <p className="text-xs text-yellow-300">{level}</p>
        </div>
      </button>
    </div>
  )
}