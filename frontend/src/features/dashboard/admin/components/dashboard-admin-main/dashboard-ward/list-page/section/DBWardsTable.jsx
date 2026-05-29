import DBWardsTableColumn from "./DBWardsTableColumn"
import DBWardsTableRows from "./DBWardsTableRows"

export default function DBWardsTable({ filteredWards }) {
    return (
        <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
                <DBWardsTableColumn />

                <tbody className="text-sm divide-y divide-gray-100">
                    {filteredWards.length === 0
                        ? (
                            <tr>
                                <td colSpan="6" className="p-12 text-center text-gray-500">
                                    Không có phường nào phù hợp với yêu cầu tìm kiếm.
                                </td>
                            </tr>
                        ) 
                        : (
                            <DBWardsTableRows filteredWards={filteredWards} />
                        )}
                </tbody>
            </table>
        </div>
    )
}
