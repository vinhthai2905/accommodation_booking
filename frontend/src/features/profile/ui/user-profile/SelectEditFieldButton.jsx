import { actionBtnStyles } from "../../style/fieldStyles"

export default function SelectEditFieldButton({isEditing, onCancelSelectedField, onEdit, isDisabledField}) {
    return (
        <div className="shrink-0 pt-1 flex justify-end">
            {isEditing ? (
                <button onClick={onCancelSelectedField} type="button" className={actionBtnStyles}>Hủy</button>
            ) : (
                <button
                    onClick={onEdit}
                    type="button"
                    disabled={isDisabledField}
                    className={actionBtnStyles}
                >
                    Chỉnh sửa
                </button>
            )}
        </div>
    )
}