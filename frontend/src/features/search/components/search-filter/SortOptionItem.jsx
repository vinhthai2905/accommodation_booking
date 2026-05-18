import { clsx } from "clsx"

export default function SortOptionItem({ value, label }) {
  return (
    <option
      value={value}
      className={clsx(
        "text-sm",
        "text-black"
      )}
    >
      {label}
    </option>
  )
}