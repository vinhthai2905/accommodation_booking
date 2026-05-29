import EditableTextField from "../components/user-profile/EditableTextField"
import EditableDateField from "../components/user-profile/EditableDateField"
import EditableSelectField from "../components/user-profile/EditableSelectField"
import EditableNameField from "../components/user-profile/EditableNameField"
import EditablePhoneFieldInfo from "../components/user-profile/EditablePhoneFieldInfo"

import { Camera } from "lucide-react"
import { FormProvider } from "react-hook-form"

import useUserProfile from "../../../hooks/profile/useUserProfile"
import useUserProfileMutation from "../../../hooks/profile/useUserProfileMutation"
import useEditingState from "../../../hooks/profile/useEditingState"
import useUserProfileForm from "../../../hooks/profile/useUserProfileForm"

export default function UserInformation() {
    const { userProfile, isLoading, isError } = useUserProfile()
    const { handleMutatingField, handleMutatingName } = useUserProfileMutation()
    const { methods, onMutatingValidatedField } = useUserProfileForm(userProfile, handleMutatingField, handleMutatingName)
    const {
        editingField,
        isDisabledField,
        setEditingField,
        onSuccessValidatedSelectedField,
        onSuccessValidatedSelectedName,
        onCancelSelectedField
    } = useEditingState(onMutatingValidatedField, methods.resetField)


    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10 flex items-center justify-center min-h-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    Đã xảy ra lỗi khi tải thông tin cá nhân. Vui lòng thử lại sau.
                </div>
            </div>
        )
    }

    const info = userProfile?.personal_info || {}
    const email = userProfile?.email

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Thông tin cá nhân</h1>
                    <p className="text-slate-500 mt-2">
                        Cập nhật thông tin của bạn và tìm hiểu cách thông tin được sử dụng.
                    </p>
                </div>

                <div className="relative shrink-0">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-medium uppercase">
                        {(info.first_name?.[0] || info.display_name?.[0] || email?.[0] || 'U')}
                    </div>
                    <button
                        className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                        <Camera className="w-4 h-4 text-slate-600" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col">
                <FormProvider {...methods}>
                    <EditableNameField
                        firstName={info.first_name}
                        lastName={info.last_name}
                        onSuccessValidated={onSuccessValidatedSelectedName}
                        onMutatingValidatedField={onMutatingValidatedField}
                        isEditing={editingField === "name"}
                        onEdit={() => setEditingField("name")}
                        onCancelSelectedField={() => onCancelSelectedField("name")}
                        isDisabledField={editingField !== null && editingField !== "name"}
                    />

                    <EditableTextField
                        label="Tên hiển thị"
                        value={info.display_name}
                        fieldName="display_name"
                        placeholder="Chọn tên hiển thị"
                        onSuccessValidated={onSuccessValidatedSelectedField}
                        onMutatingValidatedField={onMutatingValidatedField}
                        isEditing={editingField === "display_name"}
                        onEdit={() => setEditingField("display_name")}
                        onCancelSelectedField={() => onCancelSelectedField("display_name")}
                        isDisabledField={isDisabledField("display_name")}
                    />

                    <EditablePhoneFieldInfo email={email} />

                    <EditableTextField
                        label="Số điện thoại"
                        value={info.phone_number}
                        fieldName="phone_number"
                        placeholder="Thêm số điện thoại của bạn"
                        description="Chỗ nghỉ hoặc điểm du lịch bạn đặt sẽ sử dụng số này nếu họ cần liên hệ với bạn."
                        onSuccessValidated={onSuccessValidatedSelectedField}
                        onMutatingValidatedField={onMutatingValidatedField}
                        isEditing={editingField === "phone_number"}
                        onEdit={() => setEditingField("phone_number")}
                        onCancelSelectedField={() => onCancelSelectedField("phone_number")}
                        isDisabledField={isDisabledField("phone_number")}
                    />

                    <EditableDateField
                        label="Ngày sinh"
                        value={info.date_of_birth}
                        fieldName="date_of_birth"
                        onSuccessValidated={onSuccessValidatedSelectedField}
                        onMutatingValidatedField={onMutatingValidatedField}
                        isEditing={editingField === "date_of_birth"}
                        onEdit={() => setEditingField("date_of_birth")}
                        onCancelSelectedField={() => onCancelSelectedField("date_of_birth")}
                        isDisabledField={isDisabledField("date_of_birth")}
                    />

                    <EditableTextField
                        label="Quốc tịch"
                        value={info.country}
                        fieldName="country"
                        placeholder="Chọn quốc gia/khu vực bạn đến từ"
                        onSuccessValidated={onSuccessValidatedSelectedField}
                        onMutatingValidatedField={onMutatingValidatedField}
                        isEditing={editingField === "country"}
                        onEdit={() => setEditingField("country")}
                        onCancelSelectedField={() => onCancelSelectedField("country")}
                        isDisabledField={isDisabledField("country")}
                    />

                    <EditableSelectField
                        label="Giới tính"
                        value={info.gender}
                        fieldName="gender"
                        options={[
                            { label: "Nam", value: "Nam" },
                            { label: "Nữ", value: "Nữ" }
                        ]}
                        placeholder="Chọn giới tính của bạn"
                        onSuccessValidated={onSuccessValidatedSelectedField}
                        onMutatingValidatedField={onMutatingValidatedField}
                        isEditing={editingField === "gender"}
                        onEdit={() => setEditingField("gender")}
                        onCancelSelectedField={() => onCancelSelectedField("gender")}
                        isDisabledField={isDisabledField("gender")}
                    />

                    <EditableTextField
                        label="Địa chỉ"
                        value={info.address}
                        fieldName="address"
                        placeholder="Thêm địa chỉ của bạn"
                        onSuccessValidated={onSuccessValidatedSelectedField}
                        onMutatingValidatedField={onMutatingValidatedField}
                        isEditing={editingField === "address"}
                        onEdit={() => setEditingField("address")}
                        onCancelSelectedField={() => onCancelSelectedField("address")}
                        isDisabledField={isDisabledField("address")}
                    />
                </FormProvider>
            </div>
        </div>
    )
}