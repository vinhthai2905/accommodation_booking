import ChildAgeInput from "./ChildAgeInput"

export default function ChildrenAgeSearch({ childrenCount, setGuestOptions, guestOptions }) {
    if (!childrenCount || childrenCount <= 0) return null

    return (
        <div className="flex flex-col gap-3 mt-4">
            <div className="flex flex-wrap gap-2">
                {Array.from({ length: childrenCount }).map((_, index) => (
                    <ChildAgeInput
                        key={`child-age-${index + 1}`}
                        index={index + 1}
                        setGuestOptions={setGuestOptions}
                        guestOptions={guestOptions}
                    />
                ))}
            </div>
            <p className="text-sm text-gray-700 font-normal leading-relaxed mt-1">
                To find you a place to stay that fits your entire group along with correct prices, we need to know how old your children will be at check-out
            </p>
        </div>
    )
}