import AuthTitle from "./AuthTitle"
import AuthSwitchLink from "./AuthSwitchLink"

import SmallHeader from "/src/components/layout/SmallHeader"

import Form from "/src/features/authentication/Form"
import SocialLoginSection from "./SocialLoginSection"
import Policies from "/src/components/ui/Policies"

import { UserContext } from "../../context/UserContext"
import { useContext } from "react"

import useRegisterForm from "../../hooks/useRegisterForm"

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

                    <Form
                        type={type}
                        fields={fields}
                        submitText={submitText}
                        useFormHook={useRegisterForm}
                    >
                    </Form>

                    <AuthSwitchLink to={switchTo} authType={switchType} />
                    {user === "user" && <SocialLoginSection />}
                    <Policies />
                </div>
            </div>
        </>
    )
}