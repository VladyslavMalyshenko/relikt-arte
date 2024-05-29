import { Children, useEffect, useState } from "react";
import styles from "../../styles/components/UI/Button.module.scss";

type ButtonProps = {
    text?: string;
    onClickCallback: () => void;
    children?: any;
    additionalClasses?: string[];
};

const Button = ({
    text,
    onClickCallback,
    children,
    additionalClasses,
}: ButtonProps) => {
    const [buttonClassName, setButtonClassName] = useState(styles.button);

    useEffect(() => {
        let updatedClassName = styles.button;

        if (additionalClasses) {
            additionalClasses.forEach((additionalClass) => {
                updatedClassName += ` ${additionalClass}`;
            });
        }

        setButtonClassName(updatedClassName);
    }, [additionalClasses]);

    return (
        <button className={buttonClassName} onClick={onClickCallback}>
            {text || Children.map(children, (child) => child)}
        </button>
    );
};

export default Button;
