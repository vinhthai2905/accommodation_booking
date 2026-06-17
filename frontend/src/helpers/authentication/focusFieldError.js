export function FocusFieldError(responseData, setError) {
    const backendFieldMap = {
        phone_number: "phoneNumber",
        first_name: "firstName",
        last_name: "lastName",
    }

    for (const [keyInput, err] of Object.entries(responseData)) {
        const fieldName = backendFieldMap[keyInput] || keyInput

        setError(fieldName, {
            type: "server",
            message: Array.isArray(err) ? err[0] : err,
        })
    }
}

