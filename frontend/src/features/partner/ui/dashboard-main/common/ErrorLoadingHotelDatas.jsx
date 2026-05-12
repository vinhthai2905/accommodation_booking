import { clsx } from "clsx"

export default function ErrorLoadingHotelDatas({errorMessage, alterMessageError}) {
    return (
        <div
            className={clsx(
                "mx-auto mt-10 max-w-2xl p-6",
                "rounded-xl border border-red-200 bg-red-50 shadow-sm",
                "text-red-600"
            )}>
            <h3 className="text-xl font-bold mb-2">Đã xảy ra lỗi.</h3>
            <p>{errorMessage || alterMessageError}</p>
        </div>
    )
}