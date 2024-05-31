import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { RootStore } from "./redux/Stores/RootStore";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <Provider store={RootStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
