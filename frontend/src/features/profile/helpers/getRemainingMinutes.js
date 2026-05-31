export function getRemainingMinutes(verificationExpiresAt) {
    const remainingMs = new Date(verificationExpiresAt) - new Date()
    const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000))

    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60


    return `${minutes}:${String(seconds).padStart(2, "0")}`
}

export function checkTokenExpiration(verificationExpiresAt) {
    const today = new Date()
    const tokenExpiresAt = new Date(verificationExpiresAt)

    return today > tokenExpiresAt
}