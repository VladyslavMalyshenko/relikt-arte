import "../styles/components/Footer.scss";

const Footer = () => {
    const phone = "+380503266044";

    const callTo = () => {
        window.location.href = `tel:${phone}`;
    };

    return (
        <footer>
            <p className="upper black small">© 2021</p>
            <p className="upper black small">
                телефон:{" "}
                <span className="phone" onClick={callTo}>
                    {phone} роман
                </span>
            </p>
        </footer>
    );
};

export default Footer;
