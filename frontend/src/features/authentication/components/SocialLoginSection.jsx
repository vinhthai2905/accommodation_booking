import { SiGoogle, SiFacebook, SiApple } from "react-icons/si"

import SocialLoginButton from "./SocialLoginButton"

export default function SocialLoginSection() {
  return (
    <>
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#d9d9d9]" />

        <span className="text-[#1a1a1a]">
          hoặc sử dụng một trong các lựa chọn này
        </span>

        <div className="h-px flex-1 bg-[#d9d9d9]" />
      </div>

      <div className="flex justify-center gap-8">
        <SocialLoginButton loginType="google" />
        <SocialLoginButton loginType="facebook" />
        <SocialLoginButton loginType="apple" />
      </div>
    </>
  )
}