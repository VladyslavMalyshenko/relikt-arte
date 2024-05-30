import { Children, useEffect, useState } from "react";
import styles from "../../styles/components/UI/Button.module.scss";

type ButtonProps = {
    text?: string;
    onClickCallback?: () => void;
    children?: any;
    additionalClasses?: string[];
    inversed?: boolean;
    borderless?: boolean;
};

const Button = ({
    text,
    onClickCallback,
    children,
    additionalClasses,
    inversed,
    borderless = true,
}: ButtonProps) => {
    const [buttonClassName, setButtonClassName] = useState(styles.button);

    useEffect(() => {
        console.log(styles);

        let updatedClassName = `${styles.button}${
            inversed ? ` ${styles.inverse}` : ""
        }${borderless ? "" : ` ${styles.border}`}`;

        if (additionalClasses) {
            additionalClasses.forEach((additionalClass) => {
                updatedClassName += ` ${additionalClass}`;
            });
        }

        setButtonClassName(updatedClassName);
    }, [additionalClasses, inversed, borderless]);

    return (
        <button className={buttonClassName} onClick={onClickCallback}>
            {text || Children.map(children, (child) => child)}
        </button>
    );
};

export default Button;
