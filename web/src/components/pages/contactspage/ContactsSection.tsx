import "../../../styles/components/pages/contactspage/ContactsSection.scss";

const ContactsSection = () => {
    const email = "dolmatov1406@gmail.com";
    const phone = "+380503266044";

    const mailTo = () => {
        window.location.href = `mailto:${email}`;
    };

    const callTo = () => {
        window.location.href = `tel:${phone}`;
    };

    return (
        <div className="contacts-section">
            <p className="mid black bold">
                Телефон
                <span className="regular" onClick={callTo}>
                    {phone} роман
                </span>
            </p>
            <p className="mid black bold">
                Email
                <span className="regular" onClick={mailTo}>
                    {email}
                </span>
            </p>
        </div>
    );
};

export default ContactsSection;
