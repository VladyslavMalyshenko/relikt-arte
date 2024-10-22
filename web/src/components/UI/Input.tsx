import { useEffect, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import "../../styles/components/UI/Input.scss";
import DropDown, { DefaultDropDownValue } from "./DropDown";
import FilterInput from "./FilterInput";

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
    watch?: any;
    rules?: any;
    hasLabel?: boolean;
    onChosen?: any;
    readOnly?: boolean;
    dynamicLabel?: boolean;
    passwordOptions?: any;
    dependency?: any;
};

const Input = ({
    type,
    placeholder,
    name,
    options,
    control,
    errors,
    rules,
    watch = () => undefined,
    hasLabel,
    onChosen,
    readOnly,
    dynamicLabel,
    passwordOptions,
    dependency,
}: InputProps) => {
    const [isChecked, setIsChecked] = useState(true);
    const [showValue, setShowValue] = useState(true);
    const currentDependencyValue = watch(dependency?.dependencyFieldName);

    useEffect(() => {
        if (dependency && typeof currentDependencyValue !== "object") {
            if (currentDependencyValue === dependency.targetValue) {
                setShowValue(true);
            } else {
                setShowValue(false);
            }
        }
    }, [watch, dependency, currentDependencyValue]);

    const configureInput = (field: any) => {
        const className = `input-field${errors[name] ? " invalid" : ""}`;

        return type !== "dropdown" ? (
            <>
                {type === "password" && passwordOptions ? (
                    <div className="password-input-container">
                        <input
                            type={passwordOptions?.value ? "text" : "password"}
                            value={field.value || ""}
                            onChange={(e) => {
                                let cleanValue = e.target.value;

                                field.onChange(cleanValue);
                            }}
                            className={className}
                            placeholder={placeholder}
                            readOnly={readOnly || false}
                        />

                        <div
                            className="password-toggle"
                            onClick={() => passwordOptions?.toggle()}
                        >
                            {passwordOptions?.value ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M2 12C2 12 5.63636 5 12 5C18.3636 5 22 12 22 12C22 12 18.3636 19 12 19C5.63636 19 2 12 2 12Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>
                ) : ["boolean", "checkbox"].some(
                      (el: string) => el === type
                  ) ? (
                    <FilterInput
                        label={placeholder}
                        isChecked={isChecked}
                        onChange={() => {
                            setIsChecked(!isChecked);
                            field.onChange(!isChecked);
                        }}
                        wrapperStyles={{ height: "50px" }}
                    />
                ) : (
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
                )}
            </>
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

    const field =
        !["boolean", "checkbox"].every((el: string) => el === type) &&
        hasLabel ? (
            <label className="upper black small input-field-label">
                {placeholder}
                {getField()}
            </label>
        ) : (
            getField()
        );

    return showValue ? (
        <div className="input-field-wrapper">
            {field}

            {(errors as any)[name]?.message && (
                <p className="input-field-error">
                    {(errors as any)[name]?.message}
                </p>
            )}
        </div>
    ) : null;
};

export default Input;
