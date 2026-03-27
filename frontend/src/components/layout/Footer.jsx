const footerColumns = [
    {
        title: "Hỗ trợ",
        links: [
            "Quản lí các chuyến đi của bạn",
            "Liên hệ Dịch vụ Khách hàng",
            "Trung tâm thông tin bảo mật",
        ],
    },
    {
        title: "Khám phá thêm",
        links: [
            "Chương trình khách hàng thân thiết Genius",
            "Ưu đãi theo mùa và dịp lễ",
            "Bài viết về du lịch",
            "Booking.com dành cho Doanh Nghiệp",
            "Traveller Review Awards",
            "Cho thuê xe hơi",
            "Tìm chuyến bay",
            "Đặt nhà hàng",
            "Booking.com dành cho Đại Lý Du Lịch",
        ],
    },
    {
        title: "Điều khoản và cài đặt",
        links: [
            "Chính sách Bảo mật",
            "Điều khoản dịch vụ",
            "Chính sách về Khả năng tiếp cận",
            "Tranh chấp đối tác",
            "Chính sách chống Nô lệ Hiện đại",
            "Chính sách về Quyền con người",
        ],
    },
    {
        title: "Dành cho đối tác",
        links: [
            "Đăng nhập vào trang Extranet",
            "Trợ giúp đối tác",
            "Đăng chỗ nghỉ của Quý vị",
            "Trở thành đối tác phân phối",
        ],
    },
    {
        title: "Về chúng tôi",
        links: [
            "Về Booking.com",
            "Chúng tôi hoạt động như thế nào",
            "Du lịch bền vững",
            "Truyền thông",
            "Cơ hội việc làm",
            "Quan hệ cổ đông",
            "Liên hệ công ty",
            "Hướng dẫn và cáo báo nội dung",
        ],
    },
]

import FooterSection from "/src/components/ui/FooterSection"

export default function Footer() {
    return (
        <footer className="border-t bg-gray-200">
            <div className="mx-auto max-w-6xl px-2 py-10">
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
                    {footerColumns.map((column) => (
                        <FooterSection key={column.title} column={column} />
                    ))}
                </div>

                <div className="mt-5 flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm text-yellow-300">
                        ★
                    </div>
                    <span className="text-[18px] text-neutral-900">VND</span>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                    <p className="text-center text-sm text-gray-500">
                        Booking.com là một phần của Booking Holdings Inc., tập đoàn đứng đầu
                        thế giới về du lịch trực tuyến và các dịch vụ liên quan.
                    </p>
                </div>
            </div>
        </footer>
    )
}