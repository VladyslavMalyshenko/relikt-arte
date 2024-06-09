import axios from "axios";

export const getItems = (category: string) => {
    axios.get(
        `${
            process.env.REACT_APP_BACKEND_DOMAIN || "http://localhost:8000"
        }/products/${category}`
    );
};
