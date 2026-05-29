export default function parseRoomTypeDetailPayload(payload) {
  return {
    bed_quantity: Number(payload.bedQuantity),
    id_bed: Number(payload.selectedBedID),
  }
}