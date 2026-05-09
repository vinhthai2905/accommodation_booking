import FormInput from "../../../components/ui/FormInput"
import ButtonSpinner from "../../../components/ui/ButtonSpinner"

import useAuthLoginForm from "../../../hooks/authentication/common/useAuthLoginForm"
import CommonError from "../../../components/ui/CommonError"

export default function LoginForm({ submitText }) {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        onValidSubmit,
        onErrorSubmit,
    } = useAuthLoginForm()

    return (
        <form
            className="mt-8"
            onSubmit={handleSubmit(onValidSubmit, onErrorSubmit)}
            noValidate
        >
            <div className="space-y-5">
                <FormInput
                    register={register("email", {
                        required: "Email không được để trống.",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email không hợp lệ.",
                        },
                    })}
                    idFor="email"
                    type="email"
                    labelFor="Địa chỉ email"
                    placeHolderFor="Nhập email của bạn"
                    error={errors.email}
                />

                <FormInput
                    register={register("password", {
                        required: "Mật khẩu không được để trống.",
                    })}
                    idFor="password"
                    type="password"
                    labelFor="Mật khẩu"
                    placeHolderFor="Nhập mật khẩu"
                    error={errors.password}
                />
            </div>

            <CommonError error={errors.root?.server?.message}/>

            <ButtonSpinner
                isLoading={isLoading}
                submitText={submitText}
            />
        </form>
    )
}