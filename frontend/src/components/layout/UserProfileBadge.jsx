import { clsx } from "clsx"

import UserProfileDrop from "./UserProfileDrop"
import UserProfileButton from "./UserProfileButton"

import { useContext, useState } from "react"
import { AuthUserContext } from "../../context/AuthUserContext"

export default function UserProfileBadge() {
  const [isOpen, setIsOpen] = useState(false)
  const authValue = useContext(AuthUserContext)

  const initials = authValue.user?.name?.charAt(0)?.toUpperCase() || "U"
  const level = "Genius Level 1"

  return (
    <div className="relative">
      <UserProfileButton
        initials={initials}
        level={level}
        setIsOpen={setIsOpen}
      />

      <div className={clsx(
        "w-[150%]",
        "absolute right-0 top-[calc(100%+8px)] z-50",
        "transition-all duration-200 east-out",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      )}>
        <UserProfileDrop />
      </div>
    </div>
  )
}