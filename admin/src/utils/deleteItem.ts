import axios from "axios";

export const deleteItem = (id: number) => {
    axios.delete(
        `${
            process.env.REACT_APP_BACKEND_DOMAIN || "http://localhost:8000"
        }/products/${id}`
    );
};
