import { clsx } from "clsx"

export default function SocialLoginButton({ loginType, path_1, path_2, path_3, path_4 }) {
    const viewBoxMap = {
        apple: "0 0 170 170",
        google: "0 0 262 262",
        facebook: "0 0 24 24",
    }

    const viewBoxColor = {
        apple: "black",
        facebook: "blue",
        google: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"]
    }

    const paths = [path_1, path_2, path_3, path_4]

    return (
        <a
            type="button"
            className={clsx(
                "h-18 w-18",
                "flex items-center justify-center",
                "rounded border border-[#d9d9d9] bg-white text-[32px]"
            )}
        >
            <div>
                <svg
                    viewBox={viewBoxMap[loginType]}
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    aria-hidden="true"
                    focusable="false"
                    width="24"
                    height="24"
                >
                    {paths.map((p, i) => (
                        <path
                            key={i}
                            d={p}
                            fill={
                                loginType === "google"
                                    ? viewBoxColor[loginType][i]
                                    : viewBoxColor[loginType]
                            }
                        />
                    ))}
                </svg>
            </div>
        </a>
    )
}