import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import toaster from "react-hot-toast"

import { registerUser } from "../services/authAPI"
import { AuthUserContext } from "../context/AuthUserContext"

import { defaultTestValues } from "../features/authentication/configs/DefaultValues"


export default function useRegisterForm() {
  const [isLoading, setLoading] = useState(false)

  const authValue = useContext(AuthUserContext)

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

  const onValidSubmit = async (data) => {
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