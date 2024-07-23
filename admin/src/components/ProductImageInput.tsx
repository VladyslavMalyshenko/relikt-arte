import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getItems } from "../utils/getItems";
import useDidComponentMountEffect from "../utils/useDidComponentMountEffect";

const ProductImageInput = ({ image, imageIndex, setImage }: any) => {
    const action = useSelector((state: any) => state.actionReducer.action);

    const [imageObject, setImageObject] = useState(image);

    const [currentDependencyType, setCurrentDependencyType] = useState<any>(
        image.dependency
    );
    const [currentDependency, setCurrentDependency] = useState<any>({});
    const [isMain, setIsMain] = useState(image.is_main);
    const [productImageOptions, setProductImageOptions] = useState<any>({});

    const productImageFields = [
        {
            name: "колір",
            field: "color",
        },
        {
            name: "розмір",
            field: "size",
        },
        {
            name: "орієнтація",
            field: "orientation",
        },
        {
            name: "тип лиштви",
            field: "type_of_platband",
        },
        {
            name: "наявність скла",
            field: "glass_availability",
        },
    ];

    const productImageOptionsFields = [
        {
            field: "color",
            target: "color_id",
            getUrl: "/api/v1/product/related/product_color/list",
        },
        {
            field: "size",
            target: "size_id",
            getUrl: "/api/v1/product/size/list",
        },
        {
            field: "orientation",
            target: "orientation",

            choices: [
                { name: "ліва", field: "left" },
                { name: "права", field: "right" },
            ],
        },
        {
            field: "type_of_platband",
            target: "type_of_platband",
            choices: [{ name: "Г-образный", field: "L-shaped" }],
        },
        {
            field: "glass_availability",
            target: "with_glass",

            choices: [
                { name: "Присутнє", field: true },
                { name: "Відсутнє", field: false },
            ],
        },
    ];

    useEffect(() => {
        setCurrentDependencyType(image.dependency);
        setImageObject(image);
    }, [image]);

    useEffect(() => {
        const setUpOptions = async () => {
            let newOptions = {};

            for (const optionField of productImageOptionsFields) {
                const items = optionField.getUrl
                    ? await getItems(optionField.getUrl)
                    : optionField.choices;

                newOptions = {
                    ...newOptions,
                    [optionField.field]: {
                        target: optionField.target,
                        items,
                    },
                };
            }

            setProductImageOptions(newOptions);
        };

        setUpOptions();
    }, []);

    useDidComponentMountEffect(() => {
        const othersFields = productImageOptionsFields.filter(
            (field: any) => field.target !== currentDependency.field
        );

        let currentDependencyItem = { ...currentDependency };

        const setDependencyIfNone = () => {
            const target = (productImageOptionsFields as any).find(
                (item: any) => item.field === currentDependencyType
            ).target;

            const neededList = document.querySelector(
                `.product-image-container:nth-child(${
                    imageIndex + 1
                }) .product-image-fields .product-image-field:nth-child(3) ul.list-input`
            ) as any;

            const currentActive = neededList.querySelector("li.active") as any;

            const radios = neededList.querySelectorAll("li input");

            const tryParseValue = (value: any) => {
                if (value === "true" || value === "false") {
                    return value === "true";
                } else if (!isNaN(parseInt(value))) {
                    return parseInt(value);
                } else {
                    return value;
                }
            };

            if (JSON.stringify(currentDependency) === "{}") {
                if (!currentActive) {
                    radios.forEach((radio: any) => {
                        if (radio.checked) {
                            const newValue = {
                                field: target,
                                value: tryParseValue(
                                    radio.parentNode.getAttribute("data-type")
                                ),
                            };

                            currentDependencyItem = newValue;
                            setCurrentDependency(newValue);
                        }
                    });
                } else {
                    const newValue = {
                        field: target,
                        value: tryParseValue(
                            currentActive.getAttribute("data-type")
                        ),
                    };

                    const radio = currentActive.querySelector("input");

                    if (radio) {
                        radio.checked = true;
                    }

                    currentDependencyItem = newValue;
                    setCurrentDependency(newValue);
                }
            } else {
                const radiosCheckedState = Array.from(radios).map(
                    (radio: any) => radio.checked
                );

                if (radiosCheckedState.every((checked: any) => !checked)) {
                    const radio = radios[0];

                    const newValue = {
                        field: target,
                        value: tryParseValue(
                            radio.parentNode.getAttribute("data-type")
                        ),
                    };

                    radio.checked = true;
                    currentDependencyItem = newValue;
                    setCurrentDependency(newValue);

                    return;
                }
            }
        };

        setDependencyIfNone();

        const newImage = {
            ...image,
            dependency: currentDependencyType,
            [currentDependency.field]: currentDependency.value,
            is_main: isMain,
        };

        productImageOptionsFields.forEach((field) => {
            const itemValue = image[newImage.target];

            if (currentDependencyType !== field.field && itemValue !== null) {
                newImage[field.target] = null;
            }
        });

        othersFields.forEach((field: any) => {
            newImage[field.target] = null;
        });

        if (Object.keys(newImage).some((key: string) => key === "undefined")) {
            delete newImage["undefined"];
        }

        setImage(newImage);
    }, [currentDependencyType, currentDependency, isMain]);

    return (
        <div className="product-image-container">
            <img src={imageObject.photo} />

            <div className="product-image-fields">
                <div className="product-image-field">
                    <input
                        type="checkbox"
                        defaultChecked={image.is_main}
                        onChange={() => setIsMain(!isMain)}
                    />
                    Чи є головним?
                </div>

                <div className="product-image-field">
                    <ul className="list-input">
                        {productImageFields.length > 0 &&
                            productImageFields.map(
                                (fieldObject: any, index) => (
                                    <li key={`${fieldObject.field}[${index}]`}>
                                        <input
                                            name={`file_${image.id}`}
                                            type="radio"
                                            {...(action !== "add"
                                                ? {
                                                      disabled:
                                                          action === "show" ||
                                                          action === "delete",
                                                  }
                                                : {})}
                                            defaultChecked={
                                                imageObject.dependency ===
                                                fieldObject.field
                                            }
                                            onChange={() => {
                                                setCurrentDependencyType(
                                                    fieldObject.field
                                                );
                                            }}
                                        />
                                        {fieldObject.name}
                                    </li>
                                )
                            )}
                    </ul>
                    Тип залежності
                </div>

                <div className="product-image-field">
                    <ul className="list-input">
                        {productImageOptions[currentDependencyType]?.items
                            .length > 0 &&
                            productImageOptions[
                                currentDependencyType
                            ]?.items.map((item: any, index: number) => {
                                const target = (
                                    productImageOptionsFields as any
                                ).find(
                                    (item: any) =>
                                        item.field === currentDependencyType
                                ).target;

                                const isDefaultChecked =
                                    imageObject[target] === item.id;

                                const isCurrentDependencyValueEqualToItemIdOrField =
                                    currentDependency.value === item.id ||
                                    item.field;

                                return (
                                    <li
                                        key={`deps[${index}]`}
                                        data-type={item.id || item.field}
                                        className={
                                            isCurrentDependencyValueEqualToItemIdOrField ||
                                            isDefaultChecked
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <input
                                            name={`file_${image.id}_deps`}
                                            type="radio"
                                            {...(action !== "add"
                                                ? {
                                                      disabled:
                                                          action === "show" ||
                                                          action === "delete",
                                                  }
                                                : {})}
                                            defaultChecked={isDefaultChecked}
                                            onChange={() => {
                                                if (target) {
                                                    setCurrentDependency({
                                                        field: target,
                                                        value:
                                                            item.id ||
                                                            item.field,
                                                    });
                                                }
                                            }}
                                        />
                                        {item.name || item.dimensions}
                                    </li>
                                );
                            })}
                    </ul>
                    Залежність
                </div>
            </div>
        </div>
    );
};

export default ProductImageInput;
