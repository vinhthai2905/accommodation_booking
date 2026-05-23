import DBUsersTableColumn from "./DBUsersTableColumn"
import DBUsersTableRows from "./DBUsersTableRows"

export default function DBUsersTable({ filteredUsers }) {
    return (
        <div className="w-full h-full min-w-[800px]">
            <table className="w-full text-left border-collapse">
                <DBUsersTableColumn />
                <DBUsersTableRows filteredUsers={filteredUsers} />
            </table>
        </div>
    )
}
