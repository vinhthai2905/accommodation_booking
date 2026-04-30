export default function FilterItem({ label, count, subtext }) {
    return (
        <label className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <div>
                    <p>{label}</p>
                    {subtext && <p>{subtext}</p>}
                </div>
            </div>

            <span>{count}</span>
        </label>
    );
}