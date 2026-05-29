export default function FieldErrorMessage({ error }) {
    return (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
    )
}