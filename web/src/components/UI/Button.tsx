import { Children, useEffect, useState } from "react";
import styles from "../../styles/components/UI/Button.module.scss";

type ButtonProps = {
    text?: string;
    onClickCallback?: () => void;
    children?: any;
    additionalClasses?: string[];
    inversed?: boolean;
    borderless?: boolean;
    style?: React.CSSProperties;
    colorScheme?: string;
};

const Button = ({
    text,
    onClickCallback,
    children,
    additionalClasses,
    inversed,
    borderless = true,
    style = {},
    colorScheme,
}: ButtonProps) => {
    const [buttonClassName, setButtonClassName] = useState(styles.button);

    useEffect(() => {
        let updatedClassName = `${styles.button}${
            inversed ? ` ${styles.inverse}` : ""
        }${borderless ? "" : ` ${styles.border}`}`;

        if (additionalClasses) {
            additionalClasses.forEach((additionalClass) => {
                updatedClassName += ` ${additionalClass}`;
            });
        }

        if (colorScheme) {
            updatedClassName += ` ${styles[colorScheme]}`;
        }

        setButtonClassName(updatedClassName);
    }, [additionalClasses, inversed, borderless]);

    return (
        <button
            className={buttonClassName}
            style={style}
            onClick={onClickCallback}
        >
            {!colorScheme || colorScheme !== "facebook" ? (
                text || Children.map(children, (child) => child)
            ) : colorScheme === "facebook" ? (
                <>
                    <svg
                        width="13"
                        height="20"
                        viewBox="0 0 13 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.5 1H9.5C6.73858 1 4.5 3.23858 4.5 6V8H0.5V12H4.5V19H8.5V12H12.5V8H8.5V6C8.5 5.44772 8.94771 5 9.5 5H12.5V1Z"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Facebook
                </>
            ) : (
                text || Children.map(children, (child) => child)
            )}
        </button>
    );
};

export default Button;
