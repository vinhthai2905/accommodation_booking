import ViewToggle from "../../components/search-filter/ViewToggle"
import SortDropdown from "./SortDropdown"

export default function SearchSummary({ hotelList }) {
    return (
        <div className="flex justify-between mb-5">
            <SortDropdown hotelList={hotelList} />
            <ViewToggle />
        </div>
    )
}