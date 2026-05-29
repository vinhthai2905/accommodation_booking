import DBRoomTypeFormInputLabel from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeFormInputLabel"
import DBRoomTypeFormActions from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeFormActions"

import { clsx } from "clsx"
import { useFormContext } from "react-hook-form"
import { MapPin } from "lucide-react"

export default function DBEditHotelForm({ onSuccessValidatedForm, onErrorValidatedForm, isPending, onCancel }) {
    const { register, handleSubmit, formState: { errors } } = useFormContext()

    return (
        <form onSubmit={handleSubmit(onSuccessValidatedForm, onErrorValidatedForm)} className="space-y-4 p-6">
            <div>
                <DBRoomTypeFormInputLabel>
                    Tên khách sạn
                </DBRoomTypeFormInputLabel>

                <div className="relative">
                    <input
                        {...register("hotelName", { required: "Vui lòng nhập tên khách sạn" })}
                        type="text"
                        placeholder="VD: Khách sạn Mường Thanh..."
                        className={clsx(
                            "w-full rounded-xl px-4 py-2.5 outline-none",
                            "border",
                            "text-sm font-medium text-gray-900",
                            "transition-all",
                            errors?.hotelName
                                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        )}
                    />
                    {errors?.hotelName && (
                        <p className="mt-1 text-xs text-red-500">{errors?.hotelName?.message}</p>
                    )}
                </div>
            </div>

            <div>
                <DBRoomTypeFormInputLabel>
                    <MapPin size={13} className="text-gray-400" />
                    Địa chỉ
                </DBRoomTypeFormInputLabel>

                <div className="relative">
                    <input
                        {...register("address", { required: "Vui lòng nhập địa chỉ" })}
                        type="text"
                        placeholder="VD: 123 Đường Trần Phú, Quận Hải Châu, Đà Nẵng..."
                        className={clsx(
                            "w-full rounded-xl px-4 py-2.5 outline-none",
                            "border",
                            "text-sm font-medium text-gray-900",
                            "transition-all",
                            errors?.address
                                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        )}
                    />
                    {errors?.address && (
                        <p className="mt-1 text-xs text-red-500">{errors?.address?.message}</p>
                    )}
                </div>
            </div>

            <DBRoomTypeFormActions isPending={isPending} onCancel={onCancel} />
        </form>
    )
}
