import {
    Wifi, Utensils, Tv, Waves, Car,
    ConciergeBell, Shield, Sparkles,
    HelpCircle, Heart, Dumbbell,
    Coffee, ShowerHead, Flame, Sofa, Wind,
} from "lucide-react"

export const getAmenityIcon = (slug, name) => {
    const s = (slug || name || "").toLowerCase()
    if (s.includes("wifi") || s.includes("internet")) return Wifi
    if (s.includes("an-uong") || s.includes("nha-hang") || s.includes("am-thuc") || s.includes("ăn")) return Utensils
    if (s.includes("ca-phe") || s.includes("coffee") || s.includes("tra") || s.includes("phê")) return Coffee
    if (s.includes("tv") || s.includes("truyen-hinh") || s.includes("tivi")) return Tv
    if (s.includes("be-boi") || s.includes("ho-boi") || s.includes("pool") || s.includes("waves") || s.includes("bể")) return Waves
    if (s.includes("do-xe") || s.includes("parking") || s.includes("bai-xe") || s.includes("đỗ")) return Car
    if (s.includes("le-tan") || s.includes("bell") || s.includes("reception") || s.includes("lễ")) return ConciergeBell
    if (s.includes("suc-khoe") || s.includes("wellness") || s.includes("heart") || s.includes("khỏe") || s.includes("spa")) return Heart
    if (s.includes("gym") || s.includes("the-thao") || s.includes("dumbbell") || s.includes("thể")) return Dumbbell
    if (s.includes("dieu-hoa") || s.includes("air-condition") || s.includes("wind") || s.includes("hoà")) return Wind
    if (s.includes("tam") || s.includes("shower") || s.includes("ve-sinh") || s.includes("tắm")) return ShowerHead
    if (s.includes("giat") || s.includes("don-phong") || s.includes("clean") || s.includes("giặt") || s.includes("dọn")) return Sparkles
    if (s.includes("khoa") || s.includes("safe") || s.includes("security") || s.includes("bao-ve") || s.includes("an-ninh")) return Shield
    if (s.includes("sofa") || s.includes("ghe") || s.includes("phong-khach") || s.includes("ghế")) return Sofa
    if (s.includes("bep") || s.includes("nau") || s.includes("kitchen") || s.includes("bếp")) return Flame
    return HelpCircle
}
