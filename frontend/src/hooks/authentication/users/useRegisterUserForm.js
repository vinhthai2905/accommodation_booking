import { useState } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import toaster, { toast } from "react-hot-toast"

import { useAuthUserContext } from "../common/useAuthUserContext"

import { registerUser } from "../../../services/authentication/userAuthServices"

import { defaultTestValues } from "../../../features/authentication/configs/DefaultValues"

export default function useRegisterUserForm() {
  const [isLoading, setLoading] = useState(false)
  const { setAuthUserState } = useAuthUserContext()

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
        const { user, access_token } = responseData

        setAuthUserState(access_token, user.email, user.personal_info, user.role)

        toaster.success("Tạo tài khoản thành công.")
        reset()

        navigate("/index")
      }

    }
    catch (error) {
      toaster.error(`Hệ thống xảy ra lỗi, vui lòng thử lại sau. ${error.message}`)
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