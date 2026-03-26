export default function AuthHeader({ type }) {
    return (
        <>
            <h1 className="text-3xl text-center font-bold leading-tight text-[#1a1a1a]">
                {type === "signIn" ? "Đăng nhập" : "Đăng ký"}
            </h1>

            {type === "signIn" 
                ||
                <p className="text-center mt-4 leading-7 text-[#1a1a1a]">
                    Tạo tài khoản để sử dụng các dịch vụ của chúng tôi.
                </p>
            }
        </>
    )
}