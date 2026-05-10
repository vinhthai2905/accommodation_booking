export function getFieldBorderClass(error) {
    if (!error)
        return undefined

    return (
        error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-400 focus:border-blue-500"
    )
}