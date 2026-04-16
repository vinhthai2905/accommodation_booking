import { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import toast from "react-hot-toast"

import { loginUser } from "../services/authAPI"

import { AuthUserContext } from "../context/AuthUserContext"

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

            if (!response.ok) {
                toast.error("Đăng nhập không thành công.")
            }
            else {
                const { name, email, access_token } = responseData

                authContext.setAccessToken(access_token)
                authContext.setCurrentUser(name, email)

                toast.success("Đăng nhập thành công")

                navigate("/index")
            }
        }
        catch (error) {
            toast.error("Hệ thống xảy ra lỗi, vui lòng thử lại sau.")
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

