import DBRoomTypeFormInputLabel from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeFormInputLabel"
import DBRoomTypeFormActions from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeFormActions"

import { clsx } from "clsx"
import { Coins, Layers, Users } from "lucide-react"
import { useFormContext } from "react-hook-form"
import ErrorValidation from "../../../../../../../components/ui/ErrorValidation"

export default function DBCreateRoomTypeForm({ onSuccessValidatedForm, onErrorValidatedForm, isPending, onCancel }) {
    const { register, handleSubmit, formState: { errors } } = useFormContext()

    return (
        <form onSubmit={handleSubmit(onSuccessValidatedForm, onErrorValidatedForm)} className="h-full space-y-4 p-6">
            <div>
                <DBRoomTypeFormInputLabel>
                    Tên loại phòng
                </DBRoomTypeFormInputLabel>

                <div className="relative">
                    <input
                        {...register("typeName", { required: "Vui lòng nhập tên loại phòng." })}
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
                        <ErrorValidation message={errors.typeName?.message} />

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
                        type="number"
                        min="1"
                        className={clsx(
                            "w-full rounded-xl px-4 py-2.5 outline-none",
                            "border border-gray-200",
                            "text-sm font-medium text-gray-900",
                            "transition-all",
                            "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        )}
                        {...register("maxCapacity", {
                            required: "Bắt buộc.",
                            min: { value: 1, message: "Tối thiểu 1 khách." },
                        })}
                    />
                    {errors?.maxCapacity && (
                        <ErrorValidation message={errors.maxCapacity?.message} />

                    )}
                </div>

                <div>
                    <DBRoomTypeFormInputLabel>
                        <Layers size={13} className="text-gray-400" />
                        Tổng số phòng
                    </DBRoomTypeFormInputLabel>

                    <input
                        {...register("totalRooms", {
                            required: "Bắt buộc.",
                            min: { value: 0, message: "Không thể âm." },
                        })}
                        type="number"
                        min="0"
                        className={clsx(
                            "w-full rounded-xl px-4 py-2.5 outline-none",
                            "border border-gray-200",
                            "text-sm font-medium text-gray-900",
                            "transition-all",
                            "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        )}
                    />
                    {errors?.totalRooms && (
                        <ErrorValidation message={errors.totalRooms?.message} />

                    )}
                </div>
            </div>

            <div>
                <DBRoomTypeFormInputLabel>
                    <Coins size={13} className="text-gray-400" />
                    Giá phòng (VNĐ)
                </DBRoomTypeFormInputLabel>

                <input
                    {...register("price", {
                        required: "Bắt buộc.",
                        min: { value: 0, message: "Giá không thể âm." },
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
                    <ErrorValidation message={errors.price?.message} />
                )}
            </div>

            <DBRoomTypeFormActions isPending={isPending} onCancel={onCancel} />
        </form>
    )
}
