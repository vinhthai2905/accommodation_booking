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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div
            className={clsx(
                "flex flex-col items-center justify-between gap-4 p-4 mt-6",
                "text-[13px] text-gray-500",
                "sm:flex-row"
            )}
        >
            <div className="flex items-center gap-1.5">
                <HotelsSearchPreviousPageButton
                    onPageChange={() => handlePageChange(currentPage - 1)}
                    currentPage={currentPage}
                />

                <HotelsSearchTotalPages 
                    totalPages={totalPages}
                    paginateHotelsList={paginateHotelsList}
                    setCurrentPage={handlePageChange}
                    currentPage={currentPage}
                />

                <HotelsSearchNextPageButton
                    onPageChange={() => handlePageChange(currentPage + 1)}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    )
}
