import { AmenityItem } from "../components/AmenityItem";

export default function Amenities() {
  return (
    <ul className="flex flex-wrap gap-3">
      <AmenityItem  label="Căn hộ" />
      <AmenityItem  label="Bãi đỗ xe trong khuôn viên" />
      <AmenityItem  label="WiFi miễn phí" subLabel="Ở mọi khu vực · 112 Mbps" />
      <AmenityItem  label="Phòng không hút thuốc" />
      <AmenityItem  label="Dịch vụ phòng" />
      <AmenityItem  label="Hồ bơi ngoài trời" />
      <AmenityItem  label="Điều hòa không khí" />
      <AmenityItem  label="Phòng tắm riêng" />
      <AmenityItem  label="Tầm nhìn ra khung cảnh" />
      <AmenityItem  label="Bếp" />
    </ul>
  );
}