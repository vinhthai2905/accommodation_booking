import clsx from "clsx"
import HotelsSearchNextPageButton from "../../ui/HotelsSearchNextPageButton"
import HotelsSearchPreviousPageButton from "../../ui/HotelsSearchPreviousPageButton"
import HotelsSearchTotalPages from "../../ui/HotelsSearchTotalPages"
import useSearchHotelsPaginationContext from "../../../../hooks/search/hotel-search-hooks/useSearchHotelsPaginationContext"

export default function HotelSearchPagination({
    paginateHotelsList,
    totalHotels
}) {
    const {
        currentPage,
        setCurrentPage,
    } = useSearchHotelsPaginationContext()

    const totalPages = Math.ceil(totalHotels / 10)

    return (
        <div
            className={clsx(
                "flex flex-col items-center justify-between gap-4 p-4 mt-6",
                "text-[13px] text-gray-500",
                "sm:flex-row"
            )}
        >
            {/* <div className="flex items-center gap-2">
                <span>
                    Hiển thị {startItem}-{endItem} trong số {totalItems} kết quả
                </span>
                {onItemsPerPageChange && (
                    <select
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        className={clsx(
                            "ml-2 rounded px-2 py-1 outline-none",
                            "border border-gray-300 bg-white",
                            "text-gray-700",
                            "focus:border-blue-500"
                        )}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                )}
            </div> */}

            <div className="flex items-center gap-1.5">
                <HotelsSearchPreviousPageButton
                    onPageChange={() => setCurrentPage(currentPage - 1)}
                    currentPage={currentPage}
                />

                <HotelsSearchTotalPages 
                    totalPages={totalPages}
                    paginateHotelsList={paginateHotelsList}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />

                <HotelsSearchNextPageButton
                    onPageChange={() => setCurrentPage(currentPage + 1)}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    )
}
