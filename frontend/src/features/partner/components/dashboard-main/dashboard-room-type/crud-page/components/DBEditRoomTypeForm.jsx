import DBRoomTypeFormInputLabel from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeFormInputLabel"
import DBRoomTypeFormActions from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeFormActions"

import { clsx } from "clsx"
import { Coins, Layers, Users } from "lucide-react"
import { useFormContext } from "react-hook-form"

const inputClassName = clsx(
    "w-full rounded-xl px-4 py-2.5 outline-none",
    "border border-gray-200",
    "text-sm font-medium text-gray-900",
    "transition-all bg-gray-200 cursor-not-allowed",
)

export default function DBEditRoomTypeForm({ onSuccessValidatedForm, onErrorValidatedForm, isPending, onCancel }) {
    const { register, handleSubmit, formState: { errors } } = useFormContext()

    return (
        <form onSubmit={handleSubmit(onSuccessValidatedForm, onErrorValidatedForm)} className="space-y-4 p-6">
            <div>
                <DBRoomTypeFormInputLabel>
                    Tên loại phòng
                </DBRoomTypeFormInputLabel>

                <div className="relative">
                    <input
                        {...register("typeName", { required: "Vui lòng nhập tên loại phòng" })}
                        type="text"
                        placeholder="VD: Phòng Deluxe, Phòng Suite..."
                        className={clsx(
                            "w-full rounded-xl px-4 py-2.5 outline-none",
                            "border",
                            "text-sm font-medium text-gray-900",
                            "transition-all",
                            errors?.typeName
                                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        )}
                    />
                    {errors?.typeName && (
                        <p className="mt-1 text-xs text-red-500">{errors?.typeName?.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <DBRoomTypeFormInputLabel>
                        <Users size={13} className="text-gray-400" />
                        Sức chứa (Khách)
                    </DBRoomTypeFormInputLabel>

                    <input
                        {...register("maxCapacity")}
                        className={inputClassName}
                        disabled={true}
                    />

                </div>

                <div>
                    <DBRoomTypeFormInputLabel>
                        <Layers size={13} className="text-gray-400" />
                        Tổng số phòng
                    </DBRoomTypeFormInputLabel>

                    <input
                        {...register("totalRooms")}
                        className={inputClassName}
                        disabled={true}
                    />

                </div>
            </div>

            <div>
                <DBRoomTypeFormInputLabel>
                    <Coins size={13} className="text-gray-400" />
                    Giá phòng (VNĐ)
                </DBRoomTypeFormInputLabel>

                <input
                    {...register("price", {
                        required: "Bắt buộc",
                        min: { value: 0, message: "Giá không thể âm" },
                    })}
                    type="number"
                    min="0"
                    step="1000"
                    className={clsx(
                        "w-full rounded-xl px-4 py-2.5 outline-none",
                        "border border-gray-200",
                        "text-sm font-medium text-gray-900",
                        "transition-all",
                        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    )}
                />
                {errors?.price && (
                    <p className="mt-1 text-xs text-red-500">{errors?.price?.message}</p>
                )}
            </div>

            <DBRoomTypeFormActions isPending={isPending} onCancel={onCancel} />
        </form>
    )
}