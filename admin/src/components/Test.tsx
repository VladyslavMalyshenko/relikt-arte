import { useForm } from "react-hook-form";

const Test = () => {
    const { register, handleSubmit } = useForm();

    const sendNudes = (data: any) => {
        // const fd = new FormData();
        const dataKeys = Object.keys(data);

        dataKeys.forEach((dataKey: string) => {
            if (data[dataKey] instanceof FileList) {
                if (data[dataKey].length < 1) {
                    delete data[dataKey];
                } else {
                    data[dataKey] = data[dataKey][0];
                }
            }
        });

        console.log(data);

        // axios
        //   .post("http://localhost:8000/api/v1/product/create", fd)
        //   .then((res) => console.log(res))
        //   .catch((err) => console.log(err));
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
