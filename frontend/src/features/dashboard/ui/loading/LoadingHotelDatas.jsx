export default function LoadingHotelDatas({ labelLoading }) {
    return (
        <div className="flex justify-center items-center h-[60vh] text-gray-800">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-4 text-lg">{labelLoading}</span>
        </div>
    )
}