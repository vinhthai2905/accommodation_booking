interface ErrorDetail {
    token_class: string,
    token_type: string,
    message: string
}

export interface ErrorFetchUserResponse {
    detail: string,
    code: string,
    messages: [ErrorDetail]
}