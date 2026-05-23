import DBUserRow from "../row/DBUserRow"

export default function DBUsersTableRows({ filteredUsers }) {
    if (!filteredUsers?.length) {
        return (
            <tbody className="bg-white">
                <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                        Không tìm thấy người dùng nào phù hợp
                    </td>
                </tr>
            </tbody>
        )
    }

    return (
        <tbody className="bg-white divide-y divide-gray-100">
            {filteredUsers.map((user) => (
                <DBUserRow key={user.id_user} initialUser={user} />
            ))}
        </tbody>
    )
}
