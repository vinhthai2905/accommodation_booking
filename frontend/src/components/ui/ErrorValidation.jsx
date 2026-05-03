export default function ErrorValidation({ message }) {
    return (
        <p className="mt-1.5 text-sm text-red-600 font-medium">
            {message}
        </p>
    )
}