import "../../../styles/components/pages/homepage/WhyUs.scss";

const WhyUs = () => {
    return (
        <div className="why-us">
            <p className="upper biggest black">чому саме ми</p>

            <div className="why-us-features">
                <div className="why-us-feature">
                    <p className="extra-bold pre-small black">
                        Експертна майстерність
                    </p>
                    <p className="small">
                        Наш Товар володіє високою якістю та надійністю, що забезпечує довгий термін служби та відмінні результати.
                    </p>
                </div>

                <div className="why-us-feature">
                    <p className="extra-bold pre-small black">
                        Індивідуальний підхід
                    </p>
                    <p className="small">
                        Маємо індивідуальний підхід до кожного замовлення. Розглядаємо та виконуємо нестандартні рішення дизайнерських проектів
                    </p>
                </div>

                <div className="why-us-feature">
                    <p className="extra-bold pre-small black">
                        Гарантія якості
                    </p>
                    <p className="small">
                        Наша команда надає чудове обслуговування клієнтів, протягом 20 років, гарантуючи, що ви отримаєте підтримку на кожному етапі покупки.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;
