import ViewToggle from "../../components/search-filter/ViewToggle"
import SortDropdown from "./SortDropdown"

export default function SearchSummary({ paginateHotelsList }) {
    return (
        <div className="flex justify-between mb-5">
            <SortDropdown paginateHotelsList={paginateHotelsList} />
            <ViewToggle />
        </div>
    )
}