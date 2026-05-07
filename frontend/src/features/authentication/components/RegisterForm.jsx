import FormInput from "../../../components/ui/FormInput"
import ButtonSpinner from "../../../components/ui/ButtonSpinner"

export default function RegisterForm({ submitText, useFormHook }) {
    const {
        register,
        handleSubmit,
        watch,
        errors,
        isLoading,
        onValidSubmit,
        onErrorSubmit,
    } = useFormHook()

    const password = watch("password")

    return (
        <form
            className="mt-8"
            onSubmit={handleSubmit(onValidSubmit, onErrorSubmit)}
            noValidate
        >
            <div className="space-y-5">
                <FormInput
                    register={
                        register("email", {
                            required: "Email không được để trống.",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email không hợp lệ.",
                            },
                        }
                        )}
                    idFor="email"
                    type="email"
                    labelFor="Email"
                    placeHolderFor="Nhập email của bạn"
                    error={errors.email}
                />

                <FormInput
                    register={register("firstName", {
                        required: "Họ không được để trống.",
                    })}
                    idFor="firstName"
                    type="text"
                    labelFor="Họ"
                    placeHolderFor="Nhập họ"
                    error={errors.firstName}
                />

                <FormInput
                    register={register("lastName", {
                        required: "Tên không được để trống.",
                    })}
                    idFor="lastName"
                    type="text"
                    labelFor="Tên"
                    placeHolderFor="Nhập tên"
                    error={errors.lastName}
                />

                <FormInput
                    register={register("phoneNumber", {
                        required: "Số điện thoại không được để trống.",
                    })}
                    idFor="phoneNumber"
                    type="tel"
                    labelFor="Số điện thoại"
                    placeHolderFor="Nhập số điện thoại"
                    error={errors.phoneNumber}
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

                <FormInput
                    register={register("confirmPassword", {
                        required: "Xác nhận mật khẩu không được để trống.",
                        validate: (value) =>
                            value === password || "Mật khẩu xác nhận không khớp.",
                    })}
                    idFor="confirmPassword"
                    type="password"
                    labelFor="Xác nhận mật khẩu"
                    placeHolderFor="Nhập lại mật khẩu"
                    error={errors.confirmPassword}
                />
            </div>
            <ButtonSpinner
                isLoading={isLoading}
                submitText={submitText}
            />
        </form>
    )
}