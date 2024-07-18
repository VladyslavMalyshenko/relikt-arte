import { Route, Routes } from "react-router-dom";
import App from "./App";
import Test from "./components/Test";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:category" element={<App />} />
      <Route path="test" element={<Test />} />
    </Routes>
  );
};

export default Router;
