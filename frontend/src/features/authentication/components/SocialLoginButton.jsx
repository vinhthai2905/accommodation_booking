import { clsx } from "clsx"
import { SiGoogle, SiFacebook, SiApple } from "react-icons/si"

const socialIconMap = {
  google: {
    Icon: SiGoogle,
    label: "Đăng nhập bằng Google",
    className: "text-[#4285F4]",
  },
  facebook: {
    Icon: SiFacebook,
    label: "Đăng nhập bằng Facebook",
    className: "text-[#1877F2]",
  },
  apple: {
    Icon: SiApple,
    label: "Đăng nhập bằng Apple",
    className: "text-black",
  },
}

export default function SocialLoginButton({ loginType, onClick }) {
  const social = socialIconMap[loginType]

  if (!social) return null

  const { Icon, label, className } = social

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={clsx(
        "h-18 w-18",
        "flex items-center justify-center",
        "rounded border border-[#d9d9d9] bg-white",
        "transition hover:border-[#1a73e8] hover:shadow-sm cursor-pointer"
      )}
    >
      <Icon className={clsx("text-[28px]", className)} />
    </button>
  )
}