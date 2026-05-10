export default function LoadingFullScreen({ text = "Loading..." }) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
                <p className="text-sm text-gray-600">{text}</p>
            </div>
        </div>
    )
}