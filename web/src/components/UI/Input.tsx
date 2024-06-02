import { Control, Controller, FieldErrors } from "react-hook-form";
import "../../styles/components/UI/Input.scss";

type InputProps = {
    type: string;
    placeholder: string;
    name: string;
    control: Control<any>;
    errors: FieldErrors<any>;
    rules?: any;
    hasLabel?: boolean;
};

const Input = ({
    type,
    placeholder,
    name,
    control,
    errors,
    rules,
    hasLabel,
}: InputProps) => {
    const configureInput = (field: any) => {
        const className = `input-field${errors[name] ? " invalid" : ""}`;

        return (
            <input
                type={type}
                value={field.value || ""}
                onChange={(e) => {
                    let cleanValue = e.target.value;
                    if (type === "phone") {
                        cleanValue = cleanValue.replace(/[^0-9]/g, "");
                    }

                    field.onChange(cleanValue);
                }}
                maxLength={type === "phone" ? 10 : undefined}
                className={className}
                placeholder={placeholder}
            />
        );
    };

    const getRules = () => {
        if (rules) {
            return rules;
        } else if (type === "email") {
            return {
                required: "Email є обов'язковим",
                pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Неправильний email",
                },
            };
        } else if (type === "phone") {
            return {
                required: "Номер телефону є обов'язковим",
                minLength: {
                    value: 10,
                    message: "Неправильний номер телефону",
                },
            };
        }

        return {};
    };

    const getController = () => {
        return (
            <Controller
                name={name}
                control={control}
                rules={getRules()}
                render={({ field }) => configureInput(field)}
            />
        );
    };

    const getField = () => {
        return (
            <>
                {type === "phone" && !hasLabel ? (
                    <div className="input-field-phone">
                        <div className="input-field-phone-article small">
                            +38
                        </div>
                        {getController()}
                    </div>
                ) : (
                    getController()
                )}
            </>
        );
    };

    return (
        <div className="input-field-wrapper">
            {hasLabel ? (
                <label className="upper black small input-field-label">
                    {placeholder}
                    {getField()}
                </label>
            ) : (
                getField()
            )}

            {(errors as any)[name]?.message && (
                <p className="input-field-error">
                    {(errors as any)[name]?.message}
                </p>
            )}
        </div>
    );
};

export default Input;
