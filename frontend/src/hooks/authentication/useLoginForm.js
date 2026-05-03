import { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import toast from "react-hot-toast"

import { loginUser } from "../../services/authServices"

import { AuthUserContext } from "../../context/AuthUserContext"

export default function useLoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const authContext = useContext(AuthUserContext)
    const navigate = useNavigate()

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

    const onValidSubmit = async (data) => {
        setIsLoading(true)

        try {
            const response = await loginUser(data)
            const responseData = await response.json()

            console.log(responseData)

            if (!response.ok) {
                toast.error("Đăng nhập không thành công.")
            }
            else {
                const { user, access_token } = responseData

                authContext.setAuthUserState(access_token, user.email, user.personal_info)

                toast.success("Đăng nhập thành công")

                navigate("/index")
            }
        }
        catch (error) {
            toast.error(`Hệ thống xảy ra lỗi, vui lòng thử lại sau. ${error}`)
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
        onValidSubmit,
        onErrorSubmit,
    }
}

