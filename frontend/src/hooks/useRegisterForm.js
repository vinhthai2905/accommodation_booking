import { useState } from "react"
import { useForm } from "react-hook-form"
import { registerUser } from "../services/authAPI"

import toaster from "react-hot-toast"


export default function useRegisterForm() {
  const [isLoading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    mode: "onChange",
  })

  const onSubmit = async (data) => {
    setLoading(true)

    const response = await registerUser(data)

    if (response.ok) {
      toaster.success("Tạo tài khoản thành công.")
      setLoading(false)
      reset()
      const result = await response.json()
    }
  }

  const onError = () => {
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
    onSubmit,
    onError,
  }
}