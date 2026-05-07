import AuthTitle from "../components/AuthTitle"
import LoginForm from "../components/LoginForm"
import AuthSwitchLink from "../components/AuthSwitchLink"
import SocialLoginSection from "../components/SocialLoginSection"
import Policies from "/src/components/ui/Policies"

import { useOutletContext } from "react-router"


export default function LoginPage() {

  const userRole = useOutletContext()

  return (
    <>
      <div className="flex justify-center px-4 py-10 text-sm">
        <div className="w-full max-w-107.5">
          <AuthTitle type={"signIn"} />

          <LoginForm
            submitText={"Đăng nhập"}
          />

          <AuthSwitchLink to={"/auth/sign-up"} authType={"signUp"} />
          {userRole === "user" && <SocialLoginSection />}
          <Policies />
        </div>
      </div>
    </>
  )
}