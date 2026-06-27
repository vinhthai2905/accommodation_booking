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
      const responseData = await registerUser(data)

      const { user, access_token } = responseData

      setAuthUserState(access_token, user.email, user.personal_info, user.role, user.verified_at)

      toaster.success("Tạo tài khoản thành công.")
      reset()

      navigate("/index")
    }
    
    catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        const responseData = error.response.data
        toast.error("Đăng ký không thành công.")
        for (const [keyInput, err] of Object.entries(responseData)) {
          const errorMessage = Array.isArray(err) ? err[0] : err
          setError(keyInput, { type: "server", message: errorMessage }, { shouldFocus: true })
        }
      } else {
        toaster.error(`Hệ thống xảy ra lỗi, vui lòng thử lại sau. ${error.message}`)
      }
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