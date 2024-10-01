import { Control, Controller, FieldErrors } from "react-hook-form";
import "../../styles/components/UI/Input.scss";
import DropDown, { DefaultDropDownValue } from "./DropDown";

export type InputOptions = {
    labelField: string;
    valueField: string;
    options: any;
    default?: DefaultDropDownValue;
};

type InputProps = {
    type: string;
    placeholder: string;
    name: string;
    options?: InputOptions;
    control: Control<any>;
    errors: FieldErrors<any>;
    rules?: any;
    hasLabel?: boolean;
    onChosen?: any;
    readOnly?: boolean;
    dynamicLabel?: boolean;
};

const Input = ({
    type,
    placeholder,
    name,
    options,
    control,
    errors,
    rules,
    hasLabel,
    onChosen,
    readOnly,
    dynamicLabel,
}: InputProps) => {
    const configureInput = (field: any) => {
        const className = `input-field${errors[name] ? " invalid" : ""}`;

        return type !== "dropdown" ? (
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
                readOnly={readOnly || false}
            />
        ) : (
            <DropDown
                label={placeholder}
                options={options?.options?.map((option: any) => {
                    const labelField = Array.isArray(options.labelField)
                        ? options.labelField
                              .reduce(
                                  (acc, curr) => acc + ` ${option[curr]}`,
                                  ""
                              )
                              .trim()
                        : option[options.labelField];

                    const key = `${
                        !Array.isArray(options.labelField)
                            ? option[options.labelField]
                            : options.labelField
                                  .reduce(
                                      (acc, curr) => acc + ` ${option[curr]}`,
                                      ""
                                  )
                                  .trim()
                    }-${option[options.valueField]}`;

                    const value = option[options.valueField];

                    return {
                        name: labelField,
                        key,
                        value,
                    };
                })}
                field={name}
                onChosen={(field: any, value: any, label?: string) => {
                    onChosen(field, value, label);
                }}
                defaultValue={options?.default}
                borderless={false}
                needSearch={true}
                dynamicLabel={dynamicLabel}
            />
        );
    };

    const getRules = () => {
        if (rules) {
            return rules;
        } else if (type === "email") {
            return {
                required: "Email є обов'язковим",
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
