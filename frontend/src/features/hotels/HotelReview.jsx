import clsx from "clsx";

export default function ReviewBox() {
  return (
    <div
      className={clsx(
        "flex flex-col",
        "w-full border border-gray-300 bg-white",
        "p-4"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-right ml-auto">
          <p className="text-md font-light  text-gray-900">Xuất sắc</p>
          <p className="mt-1 text-sm text-gray-500">330 đánh giá</p>
        </div>

        <div
          className={clsx(
            "flex h-9 w-9 items-center justify-center rounded-sm",
            "bg-blue-700 text-md font-semibold text-white"
          )}
        >
          9,7
        </div>
      </div>

      <div className="border-t border-gray-200">
        <p className="text-base font-semibold text-gray-900">Khách lưu trú ở đây thích điều gì?</p>
        <p className="text-sm  text-gray-400">“</p>
        <p className="text-sm  text-gray-800">
          Anh chủ nhiệt tình, dễ thương. Như các căn khác ở đây, nội thất hơi cũ nhưng vẫn sử dụng được rất tốt. Căn hộ, gọn gàng, sạch sẽ. Giá phòng tốt so...
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={clsx(
            "flex h-8 w-8 items-center justify-center rounded-full",
            "bg-green-500 text-sm font-medium text-white"
          )}
        >
          P
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="font-medium text-gray-900">Phuong</span>
          <span>🇻🇳</span>
          <span>Việt Nam</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <p className="text-md font-semibold  text-gray-900">Nhân viên phục vụ</p>

        <div
          className={clsx(
            "flex h-6 min-w-13 items-center justify-center rounded-md border-2 border-gray-900 px-3",
            "text-md font-medium text-gray-900"
          )}
        >
          9,9
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous review"
        className="absolute left-2 top-1/2 hidden -translate-y-1/2 text-2xl text-gray-500"
      >
        ‹
      </button>

      <button
        type="button"
        aria-label="Next review"
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 text-2xl text-gray-500"
      >
        ›
      </button>
    </div>
  );
}