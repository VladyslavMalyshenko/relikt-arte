function encodeArray(arr) {
    // Convert array of arrays to JSON string
    let jsonString = JSON.stringify(arr);

    // Encode the JSON string to Base64
    let base64String = btoa(jsonString);

    // Replace characters for URL safety
    base64String = base64String.replace(/=/g, "_").replace(/\+/g, "-").replace(/\//g, ".");

    return base64String;
}

// Example usage
const encodedFilters = encodeArray([
    ["category", "=", "electronics"],
    ["category", "=", "electronics"],
    ["category", "=", "electronics"],
    ["category", "=", "electronics"],
    ["category", "=", "electronics"],
    ["category", "=", "electronics"],
    ["category", "=", "electronics"],
    ["category", "=", "electronics"],
]);

console.log(encodedFilters); // Display the encoded string


function decodeArray(encodedString) {
    // Replace URL safe characters back to original Base64 characters
    let base64String = encodedString.replace(/_/g, "=").replace(/-/g, "+").replace(/\./g, "/");

    // Decode the Base64 string to JSON string
    let jsonString = atob(base64String);

    // Parse the JSON string to an array
    let decodedArray = JSON.parse(jsonString);

    return decodedArray;
}

// Example usage
const decodedFilters = decodeArray(encodedFilters);
console.log(decodedFilters); // Display the decoded array
