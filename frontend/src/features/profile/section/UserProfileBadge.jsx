import UserProfileDrop from "../../../components/layout/UserProfileDrop"
import UserProfileButton from "../../../components/layout/UserProfileButton"

import { clsx } from "clsx"
import { useContext, useState } from "react"

import { AuthUserContext } from "../../../context/AuthUserContext"

import useClickOutside from "../../../hooks/useClickOutside"

import { parseFullName } from "../../../helpers/parseFullName"

export default function UserProfileBadge() {
  const [isOpen, setIsOpen] = useState(false)
  const { ref } = useClickOutside(setIsOpen)
  const authUserContext = useContext(AuthUserContext)

  const userName = (
    parseFullName(
      authUserContext.user.personal_info.first_name, 
      authUserContext.user.personal_info.last_name
    )
  )
  const level = "Genius Level 1"

  return (
    <div ref={ref} className="relative">
      <UserProfileButton
        userName={userName}
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