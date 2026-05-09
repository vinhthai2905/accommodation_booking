export const buildPayLoaderUserType = (credentials, loginAs) => {
    credentials["login_as"] = loginAs

    return credentials
}