import UserProfileDrop from "../../../components/layout/UserProfileDrop"
import UserProfileButton from "../../../components/layout/UserProfileButton"

import { clsx } from "clsx"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthUserContext } from "../../../context/AuthUserContext"

export default function UserProfileBadge() {
  const [isOpen, setIsOpen] = useState(false)
  const profileDropRef = useRef(null)
  const authUserContext = useContext(AuthUserContext)

  const initials = authUserContext.user?.name?.charAt(0)?.toUpperCase() || "U"
  const level = "Genius Level 1"

  useEffect(() => {
    function clickOutsideEvent(event) {
      if (profileDropRef.current && !profileDropRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", clickOutsideEvent)

    return () => {
      document.removeEventListener("click", clickOutsideEvent)
    }

  })

  return (
    <div ref={profileDropRef} className="relative">
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