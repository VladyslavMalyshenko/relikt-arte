import "../../../styles/components/pages/contactspage/ContactsSection.scss";

const ContactsSection = () => {
    const email = "reliktarte24@gmail.com";
    const phone = "+380503266044";

    const mailTo = () => {
        window.location.href = `mailto:${email}`;
    };

    const callTo = () => {
        window.location.href = `tel:${phone}`;
    };

    return (
        <div className="contacts-section">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16363.607423416963!2d30.08922445496149!3d50.17346874447205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ac16f31173e9%3A0x7a0bb6de31d8101b!2z0JzQntCi0J7QktCY0JvQmNCS0KHQmtCY0Jkg0JzQldCR0JXQm9Cs0J3Qq9CZINCa0J7QnNCR0JjQndCQ0KIg0JfQkNCe!5e1!3m2!1sen!2sua!4v1727780221639!5m2!1sen!2sua"
                style={{ border: 0, borderRadius: "16px" }}
                allowFullScreen={undefined}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="info">
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
                <p className="mid black bold">
                    Адреса
                    <span className="regular">
                        вулиця Нововокзальна, 1, Борова, Київська область, 08520
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ContactsSection;
