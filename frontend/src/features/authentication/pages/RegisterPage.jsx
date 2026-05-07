import AuthTitle from "../components/AuthTitle"
import RegisterForm from "../components/RegisterForm"
import AuthSwitchLink from "../components/AuthSwitchLink"
import SocialLoginSection from "../components/SocialLoginSection"
import Policies from "/src/components/ui/Policies"

import { useOutletContext } from "react-router"

import useRegisterForm from "../../../hooks/authentication/useRegisterForm"

export default function RegisterPage() {
  const user = useOutletContext()

  return (
    <>
      <div className="flex justify-center px-4 py-10 text-sm">

        <div className="w-full max-w-107.5">
          <AuthTitle type={"signUp"} />

          <RegisterForm
            submitText={"Đăng ký"}
            useFormHook={useRegisterForm}
          >
          </RegisterForm>

          <AuthSwitchLink to={"auth/sign-in"} authType={"logIn"} />
          {user === "user" && <SocialLoginSection />}
          <Policies />
        </div>
      </div>
    </>
  )
}