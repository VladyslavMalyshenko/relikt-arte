import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Router from "./router/router";
import "./styles/Default.scss";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Router />
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
