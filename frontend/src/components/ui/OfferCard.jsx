
export default function OfferCard({ eyebrow, title, description, buttonText, image }) {
    return (
        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4">
            <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600">{eyebrow}</p>

                <h3 className="mt-2 text-[20px] font-bold leading-tight text-neutral-900">
                    {title}
                </h3>

                <p className="mt-2 text-lg leading-7 text-gray-700">
                    {description}
                </p>

                <button className="mt-4 rounded-md bg-[#006ce4] px-4 py-2 text-base font-medium text-white hover:bg-[#0057b8]">
                    {buttonText}
                </button>
            </div>

            <div className="mt-4 shrink-0 sm:mt-0">
                <img
                    src={image}
                    alt=""
                    className="h-28 w-28 rounded-md object-cover"
                />
            </div>
        </div>
    )
}