export const generateUrl = (targetUrl: string) => {
    const part = "api/v1";

    const isDomainNotEndsWithSlash = !(
        process.env.REACT_APP_BACKEND_LINK || "http://localhost:8000"
    ).endsWith("/");
    const validPart = `${isDomainNotEndsWithSlash ? "/" : ""}${
        !targetUrl.includes(part) ? part : ""
    }${!targetUrl.startsWith("/") ? "/" : ""}`;

    const secondPart = `${validPart}${targetUrl}`.replaceAll("//", "/");
    const url = `${
        process.env.REACT_APP_BACKEND_LINK || "http://localhost:8000"
    }${secondPart}`;

    return url;
};
