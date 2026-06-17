import { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router"
import toast from "react-hot-toast"

import { loginAuthUser } from "../../../services/authentication/authServices"

import { AuthUserContext } from "../../../context/authentication/AuthUserContext"
import { buildPayLoaderUserType } from "../../../helpers/authentication/buildPayloadUserType"
import useBuildPayloadAuthType from "./useBuildPayloadAuthType"
import useAuthNavigation from "./useAuthNavigation"

export default function useAuthLoginForm() {
    const authContext = useContext(AuthUserContext)
    const [isLoading, setIsLoading] = useState(false)
    const navigateAfterAuth = useAuthNavigation()
    const loginAs = useBuildPayloadAuthType()

    const {
        register,
        handleSubmit,
        setError,
        watch,
        reset,
        formState: { errors }
    } = useForm({
        shouldFocusError: false,
        mode: "onChange",
    })

    const onValidSubmit = async (credentials) => {
        credentials = buildPayLoaderUserType(credentials, loginAs)
        setIsLoading(true)

        try {
            const responseData = await loginAuthUser(credentials)
            const { user, access_token } = responseData
            authContext.setAuthUserState(access_token, user.email, user.personal_info, user.role)
            toast.success("Đăng nhập thành công")
            navigateAfterAuth(user.role)
        }
        catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                const responseData = error.response.data
                const errorMessage = responseData.detail || (responseData.error ? JSON.stringify(responseData.error) : "Đăng nhập thất bại")
                setError("root.server", {
                    type: "server",
                    message: errorMessage,
                })
            } else {
                toast.error(`Hệ thống xảy ra lỗi, vui lòng thử lại sau. ${error}`)
            }
        }
        finally {
            setIsLoading(false)
        }
    }

    const onErrorSubmit = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return {
        register,
        handleSubmit,
        isLoading,
        errors,
        setError,
        onValidSubmit,
        onErrorSubmit,
    }
}

