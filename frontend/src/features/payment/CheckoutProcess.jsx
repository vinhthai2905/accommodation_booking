import CheckoutSteps from "./CheckoutSteps"
import CheckoutSummary from "./CheckoutSummary"

export default function CheckoutProcess({ currentStep = 2 }) {
    return (
        <div className="flex flex-col gap-3 mt-5 xl:mx-[20%]">
            <CheckoutSteps currentStep={currentStep}/>
            <CheckoutSummary />
        </div>
    )
}