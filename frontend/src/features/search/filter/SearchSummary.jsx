import ViewToggle from "../components/ViewToggle"
import SortDropdown from "../section/SortDropdown"

export default function SearchSummary() {
    return (
        <div className="flex justify-between mb-5">
            <SortDropdown />
            <ViewToggle />
        </div>
    )
}