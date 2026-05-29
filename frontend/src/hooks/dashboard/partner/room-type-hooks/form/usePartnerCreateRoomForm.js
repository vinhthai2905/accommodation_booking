import { useState } from "react"
import toast from "react-hot-toast"
import { useCreatePhysicalRoomMutation } from "../services/usePartnerRoomTypeMutations"

export default function usePartnerCreateRoomForm(id_room_type, setIsCreateModalOpen) {
  const [createForm, setCreateForm] = useState({
    room_name: "",
  })

  const createRoomMutation = useCreatePhysicalRoomMutation(id_room_type)

  const handleCreateRoom = (e) => {
    e.preventDefault()

    createRoomMutation.mutate(createForm, {
      onSuccess: () => {
        toast.success("Thêm phòng mới thành công!")
        setIsCreateModalOpen(false)
        setCreateForm({ room_name: "" })
      },
      onError: (error) => {
        // Handle error specifically for our 400 Bad Request if total_rooms is exceeded
        const errorMessage = error.response?.data?.error || "Đã xảy ra lỗi khi tạo phòng mới."
        toast.error(errorMessage)
      },
    })
  }

  return {
    createForm,
    setCreateForm,
    handleCreateRoom,
    isCreating: createRoomMutation.isPending,
  }
}
