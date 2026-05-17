import DBRoomTypeFormInputLabel from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeFormInputLabel"
import DBRoomTypeFormActions from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeFormActions"

import { clsx } from "clsx"
import { useFormContext } from "react-hook-form"
import ErrorValidation from "../../../../../../../components/ui/ErrorValidation"

export default function DBCreateHotelCategoryForm({ onSuccessValidatedForm, onErrorValidatedForm, isPending, onCancel }) {
    const { register, handleSubmit, formState: { errors } } = useFormContext()

    return (
        <form onSubmit={handleSubmit(onSuccessValidatedForm, onErrorValidatedForm)} className="h-full space-y-4 p-6">
            <div>
                <DBRoomTypeFormInputLabel>
                    Tên danh mục tiện nghi
                </DBRoomTypeFormInputLabel>

                <div className="relative">
                    <input
                        {...register("name", { required: "Vui lòng nhập tên danh mục tiện nghi." })}
                        type="text"
                        placeholder="VD: Tiện nghi chung, Spa & Sức khỏe..."
                        className={clsx(
                            "w-full rounded-xl px-4 py-2.5 outline-none",
                            "border",
                            "text-sm font-medium text-gray-900",
                            "transition-all",
                            errors?.name
                                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        )}
                    />
                    {errors?.name && (
                        <ErrorValidation message={errors.name?.message} />
                    )}
                </div>
            </div>

            <div>
                <DBRoomTypeFormInputLabel>
                    Slug danh mục (Tự động sinh)
                </DBRoomTypeFormInputLabel>

                <div className="relative">
                    <input
                        {...register("slug")}
                        type="text"
                        placeholder="slug-se-tu-dong-sinh"
                        readOnly
                        className={clsx(
                            "w-full rounded-xl px-4 py-2.5 outline-none",
                            "border border-gray-200 bg-gray-50 text-gray-500 font-mono text-sm",
                            "cursor-not-allowed"
                        )}
                    />
                </div>
            </div>

            <DBRoomTypeFormActions isPending={isPending} onCancel={onCancel} />
        </form>
    )
}
