import AuthTitle from "./AuthTitle"
import AuthSwitchLink from "./AuthSwitchLink"

import LoginForm from "/src/features/authentication/LoginForm"
import SocialLoginSection from "./SocialLoginSection"
import Policies from "/src/components/ui/Policies"

import { useOutletContext } from "react-router"


export default function LoginSection() {

  const user = useOutletContext()

  return (
    <>
      <div className="flex justify-center px-4 py-10 text-sm">
        <div className="w-full max-w-107.5">
          <AuthTitle type={"Đăng nhập"} />

          <LoginForm
            submitText={"Đăng nhập"}
          />

          <AuthSwitchLink to={"auth/sign-up"} authType={"signUp"} />
          {user === "user" && <SocialLoginSection />}
          <Policies />
        </div>
      </div>
    </>
  )
}