export default function CheckoutFormBorder({ children}) {
  return (
    <div className={`rounded-2xl border border-gray-300 bg-white p-6`}>
      {children}
    </div>
  )
}