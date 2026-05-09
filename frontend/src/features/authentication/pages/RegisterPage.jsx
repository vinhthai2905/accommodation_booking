import AuthTitle from "../components/AuthTitle"
import RegisterForm from "../components/RegisterForm"
import AuthSwitchLink from "../components/AuthSwitchLink"
import SocialLoginSection from "../components/SocialLoginSection"
import Policies from "/src/components/ui/Policies"

import useRegisterUserForm from "../../../hooks/authentication/users/useRegisterUserForm"
import useRegisterPartnerForm from "../../../hooks/authentication/partners/useRegisterPartnerForm"

import { useOutletContext } from "react-router"

export default function RegisterPage() {
  const user = useOutletContext()

  return (
    <>
      <div className="flex justify-center px-4 py-10 text-sm">

        <div className="w-full max-w-107.5">
          <AuthTitle type={"signUp"} />

          <RegisterForm
            registerFormHook={user === "partner" ? useRegisterPartnerForm : useRegisterUserForm}
            submitText={"Đăng ký"}
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