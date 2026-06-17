import AuthTitleAdmin from "../components/AuthTitleAdmin"
import LoginForm from "../components/LoginForm"

export default function AdminLoginPage() {
  return (
    <>
      <div className="flex justify-center px-4 py-10 text-sm">
        <div className="w-full max-w-107.5">
          <AuthTitleAdmin type={"signIn"} />

          <LoginForm
            submitText={"Đăng nhập"}
          />
        </div>
      </div>
    </>
  )
}
