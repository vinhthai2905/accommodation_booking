import ViewToggle from "../ViewToggle"
import SortDropdown from "../SortDropdown"

export default function SearchSummary() {
    return (
        <div className="flex justify-between mb-5">
            <SortDropdown />
            <ViewToggle />
        </div>
    )
}