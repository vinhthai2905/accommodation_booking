import { useRef, useState } from "react"
import { DateRange } from "react-date-range"
import { startOfDay, isSameDay, isAfter, isBefore } from "date-fns"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

export default function ReactDateRange() {
  const today = startOfDay(new Date())

  const [focusedRange, setFocusedRange] = useState([0, 0])
  const [ranges, setRanges] = useState([
    {
      startDate: today,
      endDate: today,
      key: "selection",
    },
  ])
  const keepFocusedCheckout = useRef(false)
  const isSelectingCheckout = focusedRange[1] === 1

  const minSelectableDate = isSelectingCheckout
    ? ranges[0].startDate
    : today

  return (
    <div className="p-6">
      <pre>
        {JSON.stringify(
          {
            focusedRange,
            selection: ranges[0],
          },
          null,
          2
        )}
      </pre>

      <DateRange
        ranges={ranges}
        minDate={minSelectableDate}
        focusedRange={focusedRange}
        onRangeFocusChange={(nextFocusedRange) => {

          if (
            isSelectingCheckout &&
            keepFocusedCheckout.current
          ) {
              return
          }

          setFocusedRange(nextFocusedRange)
        }}
        onChange={(item) => {
          const updatedSelection = item.selection

          if (
            isSelectingCheckout && 
            isSameDay(updatedSelection.startDate, updatedSelection.endDate)
          ) {
            keepFocusedCheckout.current = true
            return
          }

          setRanges([updatedSelection])
          keepFocusedCheckout.current = false
        }}
        moveRangeOnFirstSelection={false}
        months={2}
        direction="horizontal"
      />
    </div>
  )
}