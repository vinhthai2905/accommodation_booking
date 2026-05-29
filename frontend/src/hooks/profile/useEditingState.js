import { useState } from 'react';

export default function useEditingState(onMutatingValidatedField, resetField) {
    const [editingField, setEditingField] = useState(null)

    const onSuccessValidatedSelectedField = (payload) => {
        onMutatingValidatedField(payload, "field")
        setEditingField(null)
    }
    
    const onSuccessValidatedSelectedName = (payload) => {
        onMutatingValidatedField(payload, "name")
        setEditingField(null)
    }

    const onCancelSelectedField = (fieldName) => {
        if (fieldName === "name") {
            resetField("first_name")
            resetField("last_name")
        } else {
            resetField(fieldName)
        }
        setEditingField(null)
    }

    const isDisabledField = (fieldName) => {
        return editingField !== null && editingField !== fieldName
    }

    return {
        editingField,
        isDisabledField,
        setEditingField,
        onSuccessValidatedSelectedField,
        onSuccessValidatedSelectedName,
        onCancelSelectedField
    }
}
