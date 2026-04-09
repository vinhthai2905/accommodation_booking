import FormInput from "../../components/ui/FormInput"
import { clsx } from "clsx"

export default function Form({ fields, submitText, useFormHook }) {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        onSubmit,
        onError,
    } = useFormHook()

    return (
        <form className="mt-8" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <div className="space-y-5">
                {fields.map((field) => (
                    <FormInput
                        register={register(field.idFor, field.rules)}
                        key={field.idFor}
                        idFor={field.idFor}
                        type={field.type}
                        labelFor={field.labelFor}
                        placeHolderFor={field.placeHolderFor}
                        error={errors[field.idFor]}
                    />
                ))}
            </div>

            <button
                type="submit"
                className={clsx(
                    "w-full mt-6 px-4 py-3",
                    "font-medium text-white",
                    "rounded bg-[#006ce4]",
                    "hover:bg-[#0057c2] hover:cursor-pointer",
                    isLoading && "cursor-not-allowed opacity-70 hover:bg-[#006ce4]"
                )}
                disabled={isLoading}
            >
                {isLoading ? "Đang xử lý..." : submitText}
            </button>
        </form>
    )
}