import SmallHeader from "./SmallHeader"
import AuthHeader from "./AuthHeader"
import AuthSwitchLink from "./AuthSwitchLink"
import FormInput from "./FormInput"
import SocialLoginSection from "./SocialLoginSection"
import Policies from "./Policies"

export default function AuthForm({
    type,
    fields,
    submitText,
    switchTo,
    switchType,
}) {
    return (
        <>
            <SmallHeader />
            <div className="flex justify-center px-4 py-10 text-sm">
                <div className="w-full max-w-107.5">
                    <AuthHeader type={type} />

                    <form className="mt-8">
                        <div className="space-y-5">
                            {fields.map((field) => (
                                <FormInput
                                    key={field.idFor}
                                    idFor={field.idFor}
                                    type={field.type}
                                    labelFor={field.labelFor}
                                    placeHolderFor={field.placeHolderFor}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="mt-6 w-full rounded bg-[#006ce4] px-4 py-3 font-medium text-white hover:bg-[#0057c2]"
                        >
                            {submitText}
                        </button>

                        <AuthSwitchLink to={switchTo} authType={switchType} />
                    </form>

                    <SocialLoginSection />
                    <Policies />
                </div>
            </div>
        </>
    )
}