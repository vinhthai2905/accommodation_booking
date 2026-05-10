export default function PaymentSteps({ method }) {
    return (
        <ol
            className="mt-5 space-y-2 rounded-xl border-2 p-4 text-sm"
            style={{ borderColor: method.color + "40", backgroundColor: method.color + "08" }}
        >
            {method.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                        style={{ backgroundColor: method.color }}
                    >
                        {i + 1}
                    </span>
                    {step}
                </li>
            ))}
        </ol>
    )
}