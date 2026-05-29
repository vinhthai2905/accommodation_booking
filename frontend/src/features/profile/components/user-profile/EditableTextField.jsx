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


export default function EditableTextField({
    label,
    value,
    fieldName,
    placeholder,
    onSuccessValidated,
    description,
    customDisplay,
    isEditing,
    onEdit,
    onCancelSelectedField,
    isDisabledField
}) {
    const { register, formState: { errors }, handleSubmit } = useFormContext()
    const error = errors[fieldName]

    return (
        <div className={rowStyles}>
            <div className="sm:w-64 shrink-0 pt-1">
                <span className="text-slate-900">{label}</span>
            </div>

            <div className="flex-1">
                {isEditing ? (
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                            <span className={labelStyles}>
                                {label} <span className="text-red-500">*</span>
                            </span>

                            <input
                                type="text"
                                {...register(fieldName)}
                                placeholder={placeholder}
                                className={clsx(inputBaseStyles, error && "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500")}
                            />
                        </div>
                        {error && <FieldErrorMessage error={error} />}

                        <FormFieldSubmitButton
                            handleSubmit={handleSubmit}
                            onSuccessValidated={(data) => {
                                onSuccessValidated({ field: fieldName, value: data[fieldName] })
                            }}
                        />
                    </div>
                ) : (
                    <>
                        <div className="text-slate-500">
                            {customDisplay ? (
                                customDisplay
                            ) : value ? (
                                <span className="text-slate-900">{value}</span>
                            ) : (
                                placeholder
                            )}
                        </div>

                        {description && <p className="text-slate-500 text-sm mt-1">{description}</p>}
                    </>
                )}
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
