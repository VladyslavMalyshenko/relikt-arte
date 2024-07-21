import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getItems } from "../utils/getItems";

const ProductImageInput = ({ image, setImage }: any) => {
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
            target: "glass_availability",

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

    useEffect(() => {
        const othersFields = productImageOptionsFields.filter(
            (field: any) => field.target !== currentDependency.field
        );

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

        setImage(newImage);

        console.log(newImage);
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
                            ]?.items.map((item: any, index: number) => (
                                <li key={`deps[${index}]`}>
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
                                        onChange={() => {
                                            const target = (
                                                productImageOptionsFields as any
                                            ).find(
                                                (item: any) =>
                                                    item.field ===
                                                    currentDependencyType
                                            ).target;

                                            if (target) {
                                                setCurrentDependency({
                                                    field: target,
                                                    value:
                                                        item.id || item.field,
                                                });
                                            }
                                        }}
                                    />
                                    {item.name || item.dimensions}
                                </li>
                            ))}
                    </ul>
                    Залежність
                </div>
            </div>
        </div>
    );
};

export default ProductImageInput;
