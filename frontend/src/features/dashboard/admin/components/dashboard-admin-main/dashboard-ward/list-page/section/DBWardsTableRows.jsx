import DBWardRow from "../row/DBWardRow"

export default function DBWardsTableRows({ filteredWards }) {
    return (
        filteredWards.map((ward) => (
            <DBWardRow key={ward.id_ward} initialWard={ward} />
        ))
    )
}
