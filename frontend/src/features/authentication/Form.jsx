import FormInput from "../../components/ui/FormInput"

import { clsx } from "clsx"
import { useForm } from "react-hook-form"


export default function Form({ fields, submitText }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        shouldFocusError: false,
        mode: "onChange"
    })

    const onSubmit = async (data) => {
        const response = await fetch("http://localhost:8000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: `${data.email}`
            })
        })

        console.log(response.status)
    }

    const test = new Promise()

    test.then()

    const onError = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

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
                    "hover:bg-[#0057c2] hover:cursor-pointer"
                )}
            >
                {submitText}
            </button>
        </form>
    )
}