export const parseCreateRoomTypePayload = (formData) => {
    const payload = {
            type_name: formData.typeName,
            max_capacity: Number(formData.maxCapacity),
            total_rooms: Number(formData.totalRooms),
            price: Number(formData.price),
        }

    return payload
}