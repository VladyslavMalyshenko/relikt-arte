import Content from "./components/Content";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./styles/App.scss";

const App = () => {
    return (
        <div className="App">
            <Header />

            <div className="main">
                <Sidebar />
                <Content />
            </div>
        </div>
    );
};

export default App;
