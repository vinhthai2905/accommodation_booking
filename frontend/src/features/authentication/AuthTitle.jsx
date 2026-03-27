import { useContext } from "react"
import { UserContext } from "../UserContext"

export default function AuthTitle({ type }) {
    const user = useContext(UserContext)

    return (
        <>
            <h1 className="text-3xl text-center font-bold leading-tight text-[#1a1a1a]">
                {
                    type === "signIn"
                        ? user === "partner"
                            ? "Đăng nhập với tư cách đối tác"
                            : "Đăng nhập"
                        : user === "partner"
                            ? "Đăng ký với tư cách đối tác"
                            : "Đăng ký"
                }
            </h1>

            {type === "signIn"
                ||
                <p className="text-center mt-4 leading-7 text-[#1a1a1a]">
                    {user === "user"
                        ? "Tạo tài khoản để sử dụng các dịch vụ của chúng tôi."
                        : "Tạo tài khoản để đăng ký và quản lý chỗ nghĩ"
                    }
                </p>
            }
        </>
    )
}