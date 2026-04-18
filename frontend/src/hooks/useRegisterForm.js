import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import toaster, { toast } from "react-hot-toast"

import { registerUser } from "../services/authAPI"
import { AuthUserContext } from "../context/AuthUserContext"

import { defaultTestValues } from "../features/authentication/configs/DefaultValues"

export default function useRegisterForm() {
  const [isLoading, setLoading] = useState(false)

  const authContext = useContext(AuthUserContext)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    mode: "onChange",
    defaultValues: defaultTestValues,
  })

  const onValidSubmit = async (data) => {
    setLoading(true)

    try {
      const response = await registerUser(data)
      const responseData = await response.json()

      if (!response.ok) {
        toast.error("Đăng ký không thành công.")

        for (const [keyInput, error] of Object.entries(responseData)) {
          setError(
            keyInput,
            { type: "server", message: error },
            { shouldFocus: true }
          )
        }
      }

      else {
        const { name, email, access_token } = responseData

        authContext.setAccessToken(access_token)
        authContext.setCurrentUser(email, name)

        toaster.success("Tạo tài khoản thành công.")
        reset()

        navigate("/index")
      }

    }
    catch (error) {
      toaster.error(`Hệ thống xảy ra lỗi, vui lòng thử lại sau. ${error.message}` )
    }
    finally {
      setLoading(false)
    }
  }

  const onErrorSubmit = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return {
    register,
    handleSubmit,
    watch,
    reset,
    errors,
    isLoading,
    onValidSubmit,
    onErrorSubmit,
  }
}