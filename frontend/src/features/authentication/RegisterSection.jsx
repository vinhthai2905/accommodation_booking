import AuthTitle from "./AuthTitle"
import AuthSwitchLink from "./AuthSwitchLink"

import RegisterForm from "/src/features/authentication/RegisterForm"
import SocialLoginSection from "./SocialLoginSection"
import Policies from "/src/components/ui/Policies"

import { useOutletContext } from "react-router"

import useRegisterForm from "../../hooks/useRegisterForm"

export default function RegisterSection() {
  const user = useOutletContext()

  return (
    <>
      <div className="flex justify-center px-4 py-10 text-sm">

        <div className="w-full max-w-107.5">
          <AuthTitle type={"Đăng ký"} />

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