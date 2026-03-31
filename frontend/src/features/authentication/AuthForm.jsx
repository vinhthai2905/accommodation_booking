import AuthTitle from "./AuthTitle"
import AuthSwitchLink from "./AuthSwitchLink"

import SmallHeader from "/src/components/layout/SmallHeader"

import FormInput from "/src/components/ui/FormInput"
import SocialLoginSection from "./SocialLoginSection"
import Policies from "/src/components/ui/Policies"

import { UserContext } from "../../context/UserContext"
import { useContext } from "react"

export default function AuthForm({
    type,
    fields,
    submitText,
    switchTo,
    switchType,
}) {

    const user = useContext(UserContext)

    return (
        <>
            <SmallHeader />
            <div className="flex justify-center px-4 py-10 text-sm">
                <div className="w-full max-w-107.5">
                    <AuthTitle type={type} />

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

                    {user === "user" && <SocialLoginSection />}
                    <Policies />
                </div>
            </div>
        </>
    )
}