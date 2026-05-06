import PaymentConfirmationMain from "../section/PaymentConfirmationMain"
import PaymentConfirmationSideBar from "../section/PaymentConfirmationSidebar"

export default function PaymentConfirmationDetails({ booking, confirmationCode, pin, email }) {
    return (
        <div className="flex gap-6 items-start mx-[20%] mt-10">
            <PaymentConfirmationMain booking={booking} email={email} />
            <PaymentConfirmationSideBar confirmationCode={confirmationCode} pin={pin} />
        </div>
    )
}