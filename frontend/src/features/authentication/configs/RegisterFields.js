export const common_rules = (label) => {
  return { required: `${label} không được để trống.` }
}

export const fields = [
  {
    idFor: "email",
    type: "email",
    labelFor: "Địa chỉ email",
    placeHolderFor: "Nhập email của bạn",
    rules: {
      required: "Email không được để trống.",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Email không hợp lệ.",
      },
    },
  },
  {
    idFor: "firstName",
    type: "text",
    labelFor: "Họ",
    placeHolderFor: "Nhập họ",
    rules: {
      ...common_rules("Họ")
    }
  },
  {
    idFor: "lastName",
    type: "text",
    labelFor: "Tên",
    placeHolderFor: "Nhập tên",
    rules: {
      ...common_rules("Tên")
    }
  },
  {
    idFor: "phoneNumber",
    type: "tel",
    labelFor: "Số điện thoại",
    placeHolderFor: "Nhập số điện thoại",
    rules: {
      ...common_rules("Số điện thoại")
    }
  },
  {
    idFor: "password",
    type: "password",
    labelFor: "Mật khẩu",
    placeHolderFor: "Nhập mật khẩu",
    rules: {
      ...common_rules("Mật khẩu")
    }
  },
  {
    idFor: "confirmPassword",
    type: "password",
    labelFor: "Xác nhận mật khẩu",
    placeHolderFor: "Nhập lại mật khẩu",
    rules: {
      ...common_rules("Mật khẩu")
    }
  },
];