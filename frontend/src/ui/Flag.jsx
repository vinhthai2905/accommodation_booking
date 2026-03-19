import { clsx } from "clsx"

export default function Flag() {
    return (
        <a>
            <img
                className={clsx(
                    "h-6 y-6 rounded-2xl"
                )}
                src="https://t-cf.bstatic.com/design-assets/assets/v3.176.0/images-flags/Vn@3x.png"
            />
        </a>
    )
}