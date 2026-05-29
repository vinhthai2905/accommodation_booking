import SelectEditFieldButton from "../../ui/user-profile/SelectEditFieldButton"
import FormFieldSubmitButton from "../../ui/user-profile/FormFieldSubmitButton"
import FieldErrorMessage from "../../ui/user-profile/FieldErrorMessage"


import { useFormContext } from "react-hook-form"
import { clsx } from "clsx"

import {
    inputBaseStyles,
    rowStyles,
    labelStyles,
} from "../../style/fieldStyles"

export default function EditableNameField({
    firstName,
    lastName,
    onSuccessValidated,
    isEditing,
    onEdit,
    onCancelSelectedField,
    isDisabledField
}) {
    const displayValue = (firstName || lastName)
        ? `${firstName || ''} ${lastName || ''}`.trim()
        : ""

    const { register, formState: { errors }, handleSubmit } = useFormContext()
    
    const errorFirst = errors.first_name
    const errorLast = errors.last_name

    return (
        <div className={rowStyles}>
            <div className="sm:w-64 shrink-0 pt-1">
                <span className="text-slate-900">Tên</span>
            </div>

            <div className="flex-1">
                {isEditing
                    ? (
                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <span className={labelStyles}>Họ <span className="text-red-500">*</span></span>
                                <input
                                    {...register("first_name")}
                                    className={clsx(inputBaseStyles, errorFirst && "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500")}
                                />
                                {errorFirst && <FieldErrorMessage error={errorFirst} />}
                            </div>

                            <div className="relative">
                                <span className={labelStyles}>Tên <span className="text-red-500">*</span></span>
                                <input
                                    {...register("last_name")}
                                    className={clsx(inputBaseStyles, errorLast && "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500")}
                                />
                                {errorLast && <FieldErrorMessage error={errorLast} />}
                            </div>

                            <FormFieldSubmitButton
                                handleSubmit={handleSubmit}
                                onSuccessValidated={(data) => {
                                    onSuccessValidated({ firstName: data.first_name, lastName: data.last_name })
                                }}
                            />
                        </div>
                    )
                    : (
                        <div className="text-slate-900">
                            {displayValue || "Chưa cập nhật"}
                        </div>
                    )
                }
            </div>

            <SelectEditFieldButton
                isEditing={isEditing}
                onCancelSelectedField={onCancelSelectedField}
                onEdit={onEdit}
                isDisabledField={isDisabledField}
            />
        </div>
    )
}