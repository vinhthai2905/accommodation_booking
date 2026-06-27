import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import toaster, { toast } from "react-hot-toast"

import { registerPartner } from "../../../services/authentication/partnerAuthServices"

import { useAuthUserContext } from "../common/useAuthUserContext"

import { defaultTestValues } from "../../../features/authentication/configs/DefaultValues"
import { FocusFieldError } from "../../../helpers/authentication/focusFieldError"

export default function useRegisterPartnerForm() {
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
      const responseData = await registerPartner(data)
      const { user, access_token } = responseData
      setAuthUserState(access_token, user.email, user.personal_info, user.role, user.verified_at)
      toaster.success("Tạo tài khoản thành công.")
      reset()
      navigate("/partner/onboarding")

    }
    catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        const responseData = error.response.data
        toast.error("Đăng ký không thành công.")

        FocusFieldError(responseData, setError)
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