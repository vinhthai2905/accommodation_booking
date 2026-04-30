import { Toaster } from "react-hot-toast"

export default function ToasterUI() {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={10}
            toastOptions={{
                duration: 3000,
                style: {
                    background: "#ffffff",
                    color: "#1f2937",
                    border: "1px solid #e5e7eb",
                    padding: "12px 16px",
                    borderRadius: "10px",
                },
                success: {
                    style: {
                        background: "#ecfdf5",
                        color: "#065f46",
                        border: "1px solid #a7f3d0",
                    },
                },
                error: {
                    style: {
                        background: "#fef2f2",
                        color: "#991b1b",
                        border: "1px solid #fecaca",
                    },
                },
            }}
        />
    )
}