import MapCard from "../MapCard";

export default function FilterPanel() {
    return (
        <div className="flex flex-col gap-1">
            <MapCard />
            <div>
                <div className="w-65 border border-gray-300 rounded-sm overflow-hidden text-sm">

                    {/* Section 1 */}
                    <div className="p-4 border-b border-gray-300">
                        <h3 className="font-semibold mb-3">
                            Filter to find the perfect property
                        </h3>

                        <p className="font-medium mb-2">Use old filters</p>

                        <div className="flex flex-col gap-3">

                            {/* Item */}
                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="flex-1">The apartment</span>
                                <span className="text-gray-500">1939</span>
                            </label>

                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="flex-1">2 stars</span>
                                <span className="text-gray-500">374</span>
                            </label>

                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />

                                <div className="flex-1">
                                    <p>Excellent: 9 points or more</p>
                                    <p className="text-xs text-gray-500">
                                        Based on guest reviews
                                    </p>
                                </div>

                                <span className="text-gray-500">808</span>
                            </label>

                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="flex-1">Air Conditioner</span>
                                <span className="text-gray-500">4001</span>
                            </label>

                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="flex-1">Free WiFi</span>
                                <span className="text-gray-500">3686</span>
                            </label>

                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="p-4">
                        <h3 className="font-semibold mb-3">
                            Guest's rating
                        </h3>

                        <div className="flex flex-col gap-3">

                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="flex-1">Excellent: 9 points or more</span>
                                <span className="text-gray-500">808</span>
                            </label>

                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="flex-1">Very good: 8 points or more</span>
                                <span className="text-gray-500">1896</span>
                            </label>

                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="flex-1">Good: 7 points or more</span>
                                <span className="text-gray-500">2629</span>
                            </label>

                            <label className="flex items-start gap-2">
                                <input type="checkbox" className="mt-1" />
                                <span className="flex-1">Pleasant: 6 points or more</span>
                                <span className="text-gray-500">2996</span>
                            </label>

                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    )
}