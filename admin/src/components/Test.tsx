import axios from "axios";
import { useForm } from "react-hook-form";

const Test = () => {
    const { register, handleSubmit } = useForm();

    const sendNudes = (data: any) => {
        let dataKeys = Object.keys(data);

        dataKeys.forEach((dataKey: string) => {
            if (data[dataKey] instanceof FileList) {
                if (data[dataKey].length < 1) {
                    delete data[dataKey];
                } else {
                    data[dataKey] = data[dataKey][0];
                    data[dataKey + "_dep"] = JSON.stringify({
                        dependency: "color",
                        color_id: 8,
                    });
                }
            }
        });

        const fd = new FormData();

        dataKeys = Object.keys(data);

        dataKeys.forEach((key: string) => {
            fd.append(key, data[key]);
        });

        console.log(data);

        axios
            .post("http://localhost:8000/api/v1/product/add_photo/61", fd)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <div style={{ overflow: "auto", height: "100vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <img style={{ width: "200px", height: "200px" }} />
                <input type="file" {...register("file_1")} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <img style={{ width: "200px", height: "200px" }} />
                <input type="file" {...register("file_2")} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <img style={{ width: "200px", height: "200px" }} />
                <input type="file" {...register("file_3")} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <img style={{ width: "200px", height: "200px" }} />
                <input type="file" {...register("file_4")} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <img style={{ width: "200px", height: "200px" }} />
                <input type="file" {...register("file_5")} />
            </div>

            <button onClick={handleSubmit(sendNudes)}>
                SEND NUDES 👅👯‍♀️🔞❤️
            </button>
        </div>
    );
};

export default Test;
