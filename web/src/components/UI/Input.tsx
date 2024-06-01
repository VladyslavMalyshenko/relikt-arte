import { Control, Controller, FieldErrors } from "react-hook-form";
import "../../styles/components/UI/Input.scss";

type InputProps = {
    type: string;
    placeholder: string;
    name: string;
    control: Control<any>;
    errors: FieldErrors<any>;
    rules?: any;
};

const Input = ({
    type,
    placeholder,
    name,
    control,
    errors,
    rules,
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

    return (
        <div className="input-field-wrapper">
            {type === "phone" ? (
                <div className="input-field-phone">
                    <div className="input-field-phone-article small">+38</div>
                    <Controller
                        name={name}
                        control={control}
                        rules={{
                            required: "Номер телефону є обов'язковим",
                            minLength: {
                                value: 10,
                                message: "Неправильний номер телефону",
                            },
                        }}
                        render={({ field }) => configureInput(field)}
                    />
                </div>
            ) : (
                <Controller
                    name={name}
                    control={control}
                    rules={
                        type === "email"
                            ? {
                                  required: "Email є обов'язковим",
                                  pattern: {
                                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                      message: "Неправильний email",
                                  },
                              }
                            : rules
                    }
                    render={({ field }) => configureInput(field)}
                />
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
