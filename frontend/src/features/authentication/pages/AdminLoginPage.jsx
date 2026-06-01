import AuthTitle from "../components/AuthTitle"
import LoginForm from "../components/LoginForm"
import Policies from "/src/components/ui/Policies"

export default function AdminLoginPage() {
  return (
    <>
      <div className="flex justify-center px-4 py-10 text-sm">
        <div className="w-full max-w-107.5">
          <AuthTitle type={"signIn"} />

          <LoginForm
            submitText={"Đăng nhập Admin"}
          />

          <Policies />
        </div>
      </div>
    </>
  )
}
