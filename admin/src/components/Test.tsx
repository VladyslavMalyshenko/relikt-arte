import axios from "axios";
import { useState } from "react";

const Test = () => {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);

  const sendNudes = () => {
    const fd = new FormData();

    if (file) {
      fd.append("file_1", file);
      fd.append(
        "file_1_dep",
        JSON.stringify({ dependency: "color", color_id: 1 })
      );
    }

    if (file2) {
      fd.append("file_2", file2);
      fd.append(
        "file_2_dep",
        JSON.stringify({ dependency: "glass availability", with_glass: true })
      );
    }

    if (file3) {
      fd.append("file_3", file3);
      fd.append(
        "file_3_dep",
        JSON.stringify({ dependency: "orientation", orientation: "left" })
      );
    }

    if (file4) {
      fd.append("file_4", file4);
      fd.append(
        "file_4_dep",
        JSON.stringify({ dependency: "size", size_id: 1 })
      );
    }

    if (file5) {
      fd.append("file_5", file5);
      fd.append(
        "file_5_dep",
        JSON.stringify({
          dependency: "type of plantband",
          type_of_plantband: "L-shaped",
        })
      );
    }
    axios
      .post("http://localhost:8000/api/v1/product/create", fd)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ overflow: "auto", height: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img
          src={
            file !== null
              ? (window.URL || window.webkitURL).createObjectURL(file)
              : ""
          }
          style={{ width: "200px", height: "200px" }}
        />
        <input
          type="file"
          onChange={(e) => setFile((e as any).target.files[0])}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img
          src={
            file2 !== null
              ? (window.URL || window.webkitURL).createObjectURL(file2)
              : ""
          }
          style={{ width: "200px", height: "200px" }}
        />
        <input
          type="file"
          onChange={(e) => setFile2((e as any).target.files[0])}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img
          src={
            file3 !== null
              ? (window.URL || window.webkitURL).createObjectURL(file3)
              : ""
          }
          style={{ width: "200px", height: "200px" }}
        />
        <input
          type="file"
          onChange={(e) => setFile3((e as any).target.files[0])}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img
          src={
            file4 !== null
              ? (window.URL || window.webkitURL).createObjectURL(file4)
              : ""
          }
          style={{ width: "200px", height: "200px" }}
        />
        <input
          type="file"
          onChange={(e) => setFile4((e as any).target.files[0])}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img
          src={
            file5 !== null
              ? (window.URL || window.webkitURL).createObjectURL(file5)
              : ""
          }
          style={{ width: "200px", height: "200px" }}
        />
        <input
          type="file"
          onChange={(e) => setFile5((e as any).target.files[0])}
        />
      </div>

      <button onClick={sendNudes}>SEND NUDES 👅👯‍♀️🔞❤️</button>
    </div>
  );
};

export default Test;
