import { useOutletContext } from "react-router"

export default function AuthTitle({ type }) {
    const isPartner = useOutletContext()

    return (
        <>
            <h1 className="text-3xl text-center font-bold leading-tight text-[#1a1a1a]">
                {
                    type === "signIn"
                        ? isPartner
                            ? "Đăng nhập với tư cách đối tác"
                            : "Đăng nhập"
                        : isPartner
                            ? "Đăng ký với tư cách đối tác"
                            : "Đăng ký"
                }
            </h1>

            {type === "signIn"
                ||
                <p className="text-center mt-4 leading-7 text-[#1a1a1a]">
                    {
                        isPartner
                            ? "Tạo tài khoản để đăng ký và quản lý chỗ nghĩ"
                            : "Tạo tài khoản để sử dụng các dịch vụ của chúng tôi."
                    }
                </p>
            }
        </>
    )
}