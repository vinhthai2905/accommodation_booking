import ConfirmationCodeCard from "../components/PaymentConfirmationDetails/ConfirmationCodeCard"
import ManageWithAppCard from "../components/PaymentConfirmationDetails/ManageWithAppCard"
import RewardsCard from "../components/PaymentConfirmationDetails/RewardCard"


export default function ConfirmationSidebar({ confirmationCode, pin }) {
    return (
        <div className="w-80 shrink-0">
            <ConfirmationCodeCard confirmationCode={confirmationCode} pin={pin} />
            <ManageWithAppCard />
            <RewardsCard />
        </div>
    )
}
