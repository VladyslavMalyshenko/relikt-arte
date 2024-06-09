import axios from "axios";

export const editItem = (id: number, newItem: any) => {
    axios.patch(
        `${
            process.env.REACT_APP_BACKEND_DOMAIN || "http://localhost:8000"
        }/products/${id}`,
        newItem
    );
};
