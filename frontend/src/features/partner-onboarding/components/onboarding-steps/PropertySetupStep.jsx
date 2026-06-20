import PropertyLocationPicker from "../onboarding-map/PropertyLocationPicker"
import OnboardingPropertyLocationForm from "../onboarding-form/OnboardingPropertyLocationForm"

import { useFormContext } from "react-hook-form"
import { MapContainer, TileLayer } from "react-leaflet"

import { usePropertyBeachDistanceAnalyzation } from "../../../../hooks/partner-onboarding/common/usePropertyBeachDistanceAnalyzation"
import { usePropertyLocation } from "../../../../hooks/partner-onboarding/common/usePropertyLocation"

import "leaflet/dist/leaflet.css"
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
})


export default function PropertySetupStep({ wards, prevStep, nextStep }) {
    const { register, watch, setValue } = useFormContext()
    const address = watch("address")
    const id_ward = watch("id_ward")
    const latitude = watch("latitude")
    const longitude = watch("longitude")

    const notLocationValue = usePropertyLocation(address, id_ward, wards, setValue)

    const notValue = usePropertyBeachDistanceAnalyzation(latitude, longitude, setValue)

    const daNangBounds = [
        [15.85, 107.9],
        [16.35, 108.55],
    ]

    return (
        <div className="absolute inset-0 z-0">
            <MapContainer
                center={[16.047079, 108.20623]}
                zoom={13}
                scrollWheelZoom={true}
                minZoom={10}
                maxBounds={daNangBounds}
                className="h-full w-full z-0"
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <PropertyLocationPicker />
            </MapContainer>

            <div className="absolute top-6 left-6 z-10 w-full max-w-105 bg-white rounded-xl shadow-2xl p-6 max-h-[calc(100vh-180px)] overflow-y-auto border border-gray-100">
                <OnboardingPropertyLocationForm
                    register={register}
                    wards={wards}
                    watch={watch}
                />

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                    <button
                        type="button"
                        onClick={prevStep}
                        className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-colors flex items-center gap-2 text-sm"
                    >
                        Quay lại
                    </button>
                    <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-2.5 bg-[#006ce4] hover:bg-[#0053b4] text-white font-bold rounded-lg shadow transition-colors flex items-center gap-2 text-sm"
                    >
                        Tiếp tục
                    </button>
                </div>
            </div>
        </div>
    )
}
