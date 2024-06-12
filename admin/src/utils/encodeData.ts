export const encodeData = (data: any) => {
    const filtersJson = JSON.stringify(data);

    const filtersBase64 = btoa(filtersJson)
        .replace(/=/g, "_")
        .replace(/\+/g, "-")
        .replace(/\//g, ".");

    return filtersBase64;
};
