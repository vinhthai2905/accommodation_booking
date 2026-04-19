import { clsx } from "clsx";
import { DateRange } from "react-date-range"
import { useState, useRef } from "react";
import { isSameDay, startOfDay } from "date-fns";

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import "./css/dateRangeOverrides.css"


export default function DateSearch({ ranges, setRanges }) {
    const today = startOfDay(new Date())

    const [focusedRange, setFocusedRange] = useState([0, 0])
    const keepFocusedCheckout = useRef(false)

    const isSelectingCheckout = focusedRange[1] === 1
    const minSelectableDate = isSelectingCheckout
        ? ranges[0].startDate
        : today

    const onRangeFocusChange = (nextFocusedRange) => {
        if (
            isSelectingCheckout &&
            keepFocusedCheckout.current
        ) {
            return
        }

        setFocusedRange(nextFocusedRange)
    }

    const onChange = (item) => {
        const updatedSelection = item.bookingDate

        if (
            isSelectingCheckout &&
            isSameDay(updatedSelection.startDate, updatedSelection.endDate)
        ) {
            keepFocusedCheckout.current = true
            return
        }

        setRanges([updatedSelection])
        keepFocusedCheckout.current = false
    }

    return (
        <div
            className={clsx(
                "absolute left-0 top-full mt-2 z-10",
                "bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden",
            )}
        >
            <DateRange
                ranges={ranges}
                minDate={minSelectableDate}
                focusedRange={focusedRange}
                onRangeFocusChange={onRangeFocusChange}
                onChange={onChange}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                months={2}
                direction="horizontal"
                rangeColors={['#00000']}
            />
        </div>
    );
}
