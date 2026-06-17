import clsx from "clsx"

export function AmenityItem({ icon: Icon, label, subLabel }) {
  return (
    <li className={clsx(
      "w-fit h-10 flex items-center gap-3 rounded-lg border border-gray-300",
      "px-4 py-2 bg-white"
    )}>
      <div className="text-sm">
        <p className="text-gray-900">{label}</p>
        {subLabel && <p className="text-xs text-gray-500">{subLabel}</p>}
      </div>
    </li>
  )
}


