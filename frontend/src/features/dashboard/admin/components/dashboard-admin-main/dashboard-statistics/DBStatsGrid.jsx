import { clsx } from "clsx"
import { DollarSign, Users, TrendingUp, Hotel } from "lucide-react"
import DBStatCard from "./DBStatCard"

export default function DBStatsGrid() {
    const stats = [
        { title: "Tổng doanh thu", value: "1.245.231.000 VNĐ", change: "+20.1%", isPositive: true, icon: DollarSign },
        { title: "Người dùng hoạt động", value: "2,405", change: "+15.2%", isPositive: true, icon: Users },
        { title: "Tổng số đặt phòng", value: "842", change: "+5.4%", isPositive: true, icon: TrendingUp },
        { title: "Khách sạn được niêm yết", value: "142", change: "-1.2%", isPositive: false, icon: Hotel },
    ]

    return (
        <div className={clsx("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6")}>
            {stats.map((stat, i) => (
                <DBStatCard key={i} {...stat} delay={i * 0.1} />
            ))}
        </div>
    )
}
