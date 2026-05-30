export default function FieldEmailVerificationStatus({ verifiedAt }) {
    return (
        verifiedAt
            ?
            <span className="bg-green-600 text-white text-[11px] font-medium px-1.5 py-0.5 rounded tracking-wide">Đã xác minh</span>
            :
            <span className="bg-yellow-600 text-white text-[11px] font-medium px-1.5 py-0.5 rounded tracking-wide">Chưa xác minh</span>
    )
}