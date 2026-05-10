import { Link } from "react-router"

export default function AuthSwitchLink({ to, authType }) {
    return (
        <Link to={to} className="mt-4 text-center text-[#1a1a1a] block">
            {authType === "logIn" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
            <span className="text-[#006ce4] cursor-pointer hover:underline">
                {authType === "logIn" ? "Đăng ký" : "Đăng nhập"}
            </span>
        </Link>
    )
}