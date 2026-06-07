import { clsx } from "clsx"

export default function HotelsSearchTotalPages({ totalPages, setCurrentPage, currentPage }) {
    return Array.from({ length: totalPages }).map((index, page) => {
        return (
            <button
                key={page + 1}
                onClick={() => setCurrentPage(page + 1)}
                className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded",
                    currentPage === page + 1
                        ? "border border-blue-600 bg-blue-50 font-medium text-blue-600"
                        : "border border-transparent text-gray-600 transition-colors hover:bg-gray-50 hover:border-gray-300"
                )}
            >
                {page + 1}
            </button>
        )
    })
}