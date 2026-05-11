import AuthTitle from "../components/AuthTitle"
import LoginForm from "../components/LoginForm"
import AuthSwitchLink from "../components/AuthSwitchLink"
import SocialLoginSection from "../components/SocialLoginSection"
import Policies from "/src/components/ui/Policies"

import { useOutletContext } from "react-router"


export default function LoginPage() {
  const isPartner = useOutletContext()
  const switchLink = isPartner ? "/auth/partner/sign-up" : "/auth/sign-up"

  return (
    <>
      <div className="flex justify-center px-4 py-10 text-sm">
        <div className="w-full max-w-107.5">
          <AuthTitle type={"signIn"} />

          <LoginForm
            submitText={"Đăng nhập"}
          />

          <AuthSwitchLink to={switchLink} authType={"signUp"} />
          {/* {!isPartner && <SocialLoginSection />} */}
          <Policies />
        </div>
      </div>
    </>
  )
}