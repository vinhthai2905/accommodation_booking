import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import toaster from "react-hot-toast"

import { registerUser } from "../services/authAPI"
import { AuthContext } from "../context/AuthContext"

import { defaultTestValues } from "../features/authentication/configs/RegisterFields"


export default function useRegisterForm() {
  const [isLoading, setLoading] = useState(false)

  const authValue = useContext(AuthContext)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
    mode: "onChange",
    defaultValues: defaultTestValues,
  })

  const onSubmit = async (data) => {
    setLoading(true)

    const response = await registerUser(data)

    if (response.ok) {
      const userData = await response.json()

      authValue.setUser(userData)


      toaster.success("Tạo tài khoản thành công.")
      setLoading(false)
      reset()

      navigate("/index")
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