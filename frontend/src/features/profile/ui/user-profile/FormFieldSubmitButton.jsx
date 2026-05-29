import { saveBtnStyles } from "../../style/fieldStyles"

export default function FormFieldSubmitButton({ handleSubmit, onSuccessValidated }) {
    return (
        <div>
            <button
                type="submit"
                onClick={handleSubmit(onSuccessValidated)}
                className={saveBtnStyles}
            >
                Lưu
            </button>
        </div>
    )
}