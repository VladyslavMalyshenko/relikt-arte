import "../../styles/components/UI/Loader.scss";

const Loader = (style?: any) => {
    return (
        <p className="loader" style={style?.style || style}>
            Завантаження...
        </p>
    );
};
export default Loader;
