import { clsx } from "clsx"
import { Loader2, Plus } from "lucide-react"

export default function DBAddBedForm({handleAdd, form, availableBeds, setForm, addRoomTypeDetailMutation}) {
    return (
        <div className={clsx(
            "shrink-0 border-t border-gray-200 px-6 py-5",
            "bg-gray-50/50"
        )}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                Thêm giường
            </p>
            <form onSubmit={handleAdd} className="flex items-end gap-3">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-500 mb-1.5">
                        Loại giường
                    </label>
                    <select
                        required
                        value={form.id_bed}
                        onChange={(e) => setForm({ ...form, id_bed: e.target.value })}
                        className={clsx(
                            "w-full rounded-xl px-3 py-2.5 outline-none text-sm",
                            "border border-gray-200 bg-white text-gray-800",
                            "focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                        )}
                    >
                        <option value="">Chọn loại giường...</option>
                        {availableBeds?.map((bed) => (
                            <option key={bed.id} value={bed.id}>
                                {bed.name}{bed.size ? ` (${bed.size})` : ""}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-28">
                    <label className="block text-[11px] font-medium text-gray-500 mb-1.5">
                        Số lượng
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        required
                        value={form.bed_quantity}
                        onChange={(e) => setForm({ ...form, bed_quantity: e.target.value })}
                        className={clsx(
                            "w-full rounded-xl px-3 py-2.5 outline-none text-sm text-center font-semibold",
                            "border border-gray-200 bg-white text-gray-800",
                            "focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                        )}
                    />
                </div>

                <button
                    type="submit"
                    disabled={addRoomTypeDetailMutation.isPending || !form.id_bed}
                    className={clsx(
                        "flex items-center gap-1.5 px-5 py-2.5 rounded-xl",
                        "bg-violet-600 text-white text-sm font-semibold",
                        "shadow-md shadow-violet-500/20",
                        "hover:bg-violet-700 active:scale-[0.98] transition-all cursor-pointer",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                    )}
                >
                    {addRoomTypeDetailMutation.isPending ? (
                        <Loader2 size={15} className="animate-spin" />
                    ) : (
                        <Plus size={15} />
                    )}
                    <span>Thêm</span>
                </button>
            </form>
        </div>
    )
}