import { useEffect, useState } from "react";
import { Control, FieldErrors, useFormContext } from "react-hook-form";
import { getItems } from "../../utils/getItems";
import Input from "./Input";
import Loader from "./Loader";

type FieldOptions = {
    labelField: string | string[];
    valueField: string;
    url: string;
    load?: boolean;
};

type Field = {
    type: string;
    placeholder: string;
    name: string;
    rules?: any;
    options?: FieldOptions;
    optionsUrl?: string;
    dependency?: any;
};

type FormProps = {
    control: Control<any>;
    errors: FieldErrors<any>;
    fields: Field[];
};

const debounce = (func: any, delay: any) => {
    let timeout: any;
    return (...args: any) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

const Form = ({ control, errors, fields }: FormProps) => {
    const [fieldOptions, setFieldOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [previousRegion, setPreviousRegion] = useState("");
    const [previousAddress, setPreviousAddress] = useState("");

    const { watch, setValue, getValues } = useFormContext();

    const region = watch("region").value;
    const city_or_settlement = watch("city_or_settlement").value;
    const addressFields = ["region", "city_or_settlement", "warehouse"];

    useEffect(() => {
        const currentValues = getValues();

        if (
            region &&
            region !== previousRegion &&
            (currentValues.city_or_settlement || currentValues.warehouse)
        ) {
            setValue("city_or_settlement", "");
            setValue("warehouse", "");
            setPreviousRegion(currentValues.region);
        }
    }, [region]);

    useEffect(() => {
        const currentValues = getValues();

        if (
            currentValues.region &&
            currentValues.city_or_settlement &&
            currentValues.city_or_settlement !== previousAddress
        ) {
            setValue("warehouse", "");
            setPreviousAddress(currentValues.city_or_settlement);
        }
    }, [city_or_settlement]);

    useEffect(() => {
        const fetchOptions = debounce(async () => {
            const optionsArray = await Promise.all(
                fields.map(async (field: Field) => {
                    if (field.options) {
                        let url;
                        const currentValues = getValues();

                        if (!field.options.url.includes("$")) {
                            url = field.options.url;
                        } else {
                            const targetField = field.options.url.split("$")[1];
                            const value =
                                currentValues[targetField]?.value ||
                                currentValues[targetField];

                            if (!value) return null;

                            url = field.options.url.replace(
                                "$" + targetField,
                                value
                            );
                        }

                        const options = await getItems(url);

                        if (!region || !city_or_settlement) {
                            setLoading(true);
                        }

                        return options;
                    }
                    return null;
                })
            );

            setFieldOptions(optionsArray);
            setLoading(false);
        }, 500);

        fetchOptions();
    }, [region, city_or_settlement]);

    const onChosen = (field: string, value: any, label?: string) => {
        const currentValue = getValues(field);
        if (value && currentValue !== value) {
            if (addressFields.every((el) => el !== field)) {
                setValue(field, value);
            } else {
                setValue(field, { value, label });
            }

            if (field === "city_or_settlement") {
                setPreviousAddress(value);
            }
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                fields.map((field, index) => {
                    const options = field.options as any;
                    const targetField: any = field?.options?.url.split("$")[1];
                    const values = getValues();

                    return targetField || field.name === "region" ? (
                        field.options &&
                        ((field.name === "city_or_settlement" &&
                            values.region) ||
                            (field.name === "warehouse" &&
                                values.region &&
                                values.city_or_settlement) ||
                            field.name === "region") ? (
                            <Input
                                key={`formField[${index}]`}
                                type={field.type}
                                control={control}
                                errors={errors}
                                watch={watch}
                                placeholder={field.placeholder}
                                name={field.name}
                                rules={field.rules}
                                options={{
                                    labelField: options?.labelField,
                                    valueField: options?.valueField,
                                    options: fieldOptions[index],
                                    ...(values[field.name] && {
                                        default: {
                                            defaultFieldName: "value",
                                            defaultValue:
                                                values[
                                                    targetField
                                                        ? targetField ===
                                                          "region"
                                                            ? "city_or_settlement"
                                                            : "warehouse"
                                                        : "region"
                                                ],
                                        },
                                    }),
                                }}
                                onChosen={onChosen}
                                dynamicLabel={addressFields.some(
                                    (addressField: string) =>
                                        addressField === field.name
                                )}
                                dependency={field.dependency}
                            />
                        ) : null
                    ) : (
                        <Input
                            key={`formField[${index}]`}
                            type={field.type}
                            control={control}
                            errors={errors}
                            watch={watch}
                            placeholder={field.placeholder}
                            name={field.name}
                            rules={field.rules}
                            dependency={field.dependency}
                        />
                    );
                })
            )}
        </>
    );
};

export default Form;
