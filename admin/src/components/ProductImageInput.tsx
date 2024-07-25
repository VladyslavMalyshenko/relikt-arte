import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentAction } from "../redux/actions/currentActionActions";
import { SetDeleteItem } from "../redux/actions/currentDeleteObjectActions";
import "../styles/components/ProductImageInput.scss";
import { getElementAsync } from "../utils/getElementAsync";
import { getItem } from "../utils/getItem";

const ProductImageInput = ({
    image,
    imageIndex,
    setImage,
    selectOptions,
    optionFields,
}: any) => {
    const action = useSelector((state: any) => state.actionReducer.action);
    const dispatch = useDispatch();
    const category = useSelector(
        (state: any) => state.categoryReducer.category
    );

    const item = useSelector((state: any) => state.itemReducer.item);

    const [imageObject, setImageObject] = useState(image);

    const [currentDependencyType, setCurrentDependencyType] = useState<any>(
        image.dependency
    );
    const [currentDependency, setCurrentDependency] = useState<any>({});
    const [isMain, setIsMain] = useState(image.is_main);
    const [choiceChosen, setChoiceChosen] = useState<any>({});
    const [chosenDependencies, setChosenDependencies] = useState<any>([]);
    const [currentFile, setCurrentFile] = useState<any>(null);
    const imageInputRef = useRef<any>(null);
    const delay = 50;

    const openFileInput = () => {
        imageInputRef.current.click();
    };

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

    const sendRequest = async (action: string) => {
        dispatch(SetCurrentAction(action));
        dispatch(
            SetDeleteItem({
                url: "/api/v1/product/delete_photo/$id/",
                item: image,
            })
        );

        await getItem(category.getItemUrl, { id: item.id });
    };

    useEffect(() => {
        setCurrentDependencyType(image.dependency);
        setImageObject(image);
    }, [image]);

    const formatDependencyType = (dependency: string) => {
        return dependency === "type_of_platband" ||
            dependency === "glass_availability"
            ? dependency
                  .split("_")
                  .filter((item: string) => item)
                  .join(" ")
            : dependency;
    };

    useEffect(() => {
        const updateDependency = () => {
            const fieldObject = optionFields.find(
                (item: any) =>
                    formatDependencyType(item.field) === currentDependencyType
            );

            if (!fieldObject) return;

            const target = fieldObject.target;
            const items = selectOptions[currentDependencyType]?.items || [];

            let updated = false;

            items.forEach((item: any) => {
                const isDefaultChecked =
                    imageObject[target] === item.id || item.field;
                const isCurrentDependencyValueEqualToItemIdOrField =
                    currentDependency.value === item.id || item.field;

                const currentChoice =
                    fieldObject?.choices?.find(
                        (choice: any) => choice.field === item.field
                    ) || {};

                if (
                    currentChoice &&
                    currentChoice.chosen &&
                    isDefaultChecked &&
                    JSON.stringify(choiceChosen) !==
                        JSON.stringify(currentChoice.chosen)
                ) {
                    setChoiceChosen(currentChoice.chosen);
                    updated = true;
                }

                if (isDefaultChecked && target) {
                    const newValue = {
                        field: target,
                        value: item.id || item.field,
                    };

                    if (
                        JSON.stringify(currentDependency) !==
                        JSON.stringify(newValue)
                    ) {
                        setCurrentDependency(newValue);
                        updated = true;
                    }
                }
            });

            if (!updated) {
                setChoiceChosen({});
                setCurrentDependency({});
            }
        };

        updateDependency();
    }, [currentDependencyType, imageObject, optionFields, selectOptions]);

    useEffect(() => {
        const setUpFields = async () => {
            const tryParseValue = (value: any) => {
                if (value === "true" || value === "false") {
                    return value === "true";
                } else if (!isNaN(parseInt(value))) {
                    return parseInt(value);
                } else {
                    return value;
                }
            };

            if (imageObject.photo) {
                let currentDependencyItem = { ...currentDependency };
                let currentChosenDependencies = [...chosenDependencies];

                const setDependencyIfNone = async () => {
                    const fieldObject = (optionFields as any).find(
                        (item: any) =>
                            formatDependencyType(item.field) ===
                            currentDependencyType
                    );

                    if (JSON.stringify(currentDependencyItem) === "{}") {
                        if (fieldObject.getUrl) {
                            const selectOption =
                                selectOptions[fieldObject.field];

                            if (selectOption && selectOption.items.length > 0) {
                                const targetFieldValue =
                                    image[selectOption.target];

                                if (targetFieldValue) {
                                    const isCurrentItemIncluded =
                                        selectOption.items.some(
                                            (item: any) =>
                                                item.id === targetFieldValue
                                        );

                                    const newValue = {
                                        field: selectOption.target,
                                        value: targetFieldValue,
                                    };

                                    if (
                                        isCurrentItemIncluded &&
                                        JSON.stringify(
                                            currentDependencyItem
                                        ) !== JSON.stringify(newValue)
                                    ) {
                                        currentDependencyItem = newValue;
                                        setCurrentDependency(newValue);
                                    }

                                    return;
                                } else {
                                    const neededList = (await getElementAsync(
                                        `.product-image-container:nth-child(${
                                            imageIndex + 1
                                        }) .product-image-fields .product-image-field:nth-child(3) ul.list-input`
                                    )) as any;

                                    if (neededList) {
                                        const radios =
                                            neededList.querySelectorAll(
                                                `li input`
                                            ) as any;

                                        Array.from(radios).forEach(
                                            (radio: any) => {
                                                if (radio.checked) {
                                                    const parentDataType =
                                                        tryParseValue(
                                                            radio.parentNode.getAttribute(
                                                                "data-type"
                                                            )
                                                        );

                                                    if (
                                                        selectOption.items.some(
                                                            (item: any) =>
                                                                item.id ===
                                                                parentDataType
                                                        )
                                                    ) {
                                                        const newValue = {
                                                            field: selectOption.target,
                                                            value: parentDataType,
                                                        };

                                                        if (
                                                            JSON.stringify(
                                                                currentDependencyItem
                                                            ) !==
                                                            JSON.stringify(
                                                                newValue
                                                            )
                                                        ) {
                                                            currentDependencyItem =
                                                                newValue;
                                                            setCurrentDependency(
                                                                newValue
                                                            );
                                                        }
                                                    }
                                                }
                                            }
                                        );
                                    }
                                }
                            }
                        } else {
                            const choicesValues = fieldObject.choices.map(
                                (choice: any) => choice.field
                            );

                            const imageCurrentValue = image[fieldObject.target];

                            const isValueEqualToCurrentImageValue =
                                choicesValues.some(
                                    (value: any) => value === imageCurrentValue
                                );

                            const choiceChosen = fieldObject.choices
                                .filter((choice: any) => choice.chosen)
                                .map((choice: any) => choice.chosen);

                            if (isValueEqualToCurrentImageValue) {
                                choiceChosen.forEach((chosenObject: any) => {
                                    const isTargetFieldInImage =
                                        image[chosenObject.target];

                                    if (!isTargetFieldInImage) {
                                        image[chosenObject.field] = null;
                                    } else {
                                        image[chosenObject.field] =
                                            chosenObject.fieldValue;
                                    }

                                    const newValue = {
                                        field: chosenObject.field,
                                        value: !isTargetFieldInImage
                                            ? null
                                            : chosenObject.fieldValue,
                                    };

                                    currentDependencyItem = newValue;
                                    setCurrentDependency(newValue);
                                });

                                return;
                            } else {
                                choiceChosen.forEach((chosenObject: any) => {
                                    if (image[chosenObject.target]) {
                                        image[chosenObject.field] =
                                            chosenObject.fieldValue;

                                        const newValue = {
                                            field: chosenObject.field,
                                            value: chosenObject.fieldValue,
                                        };

                                        currentDependencyItem = newValue;
                                        setCurrentDependency(newValue);
                                    }
                                });

                                return;
                            }
                        }
                    } else {
                        const neededList = (await getElementAsync(
                            `.product-image-container:nth-child(${
                                imageIndex + 1
                            }) .product-image-fields .product-image-field:nth-child(3) ul.list-input`
                        )) as any;

                        if (neededList) {
                            const radio = neededList.querySelector(
                                `li[data-type="${currentDependencyItem.value}"] input`
                            ) as any;

                            if (radio) {
                                radio.checked = true;
                            }
                        }
                    }
                };

                const setChosenDependenciesIfNone = async () => {
                    const fieldObject = (optionFields as any).find(
                        (item: any) =>
                            formatDependencyType(item.field) ===
                            currentDependencyType
                    );

                    if (fieldObject.choices) {
                        const currentChoice = fieldObject.choices.find(
                            (item: any) =>
                                item.field === currentDependencyItem.value
                        );

                        if (currentChoice && currentChoice.chosen) {
                            const optionChosen = currentChoice.chosen;

                            if (
                                image[optionChosen.field] ===
                                optionChosen.fieldValue
                            ) {
                                const optionTargetValue =
                                    image[optionChosen.target];

                                const targetObject = {
                                    field: optionChosen.target,
                                    target: optionChosen.field,
                                    targetValue: optionChosen.fieldValue,
                                    value: optionTargetValue,
                                };

                                const isTargetObjectInChosenDependencies =
                                    chosenDependencies.some(
                                        (item: any) =>
                                            JSON.stringify(item) ===
                                            JSON.stringify(targetObject)
                                    );

                                if (!isTargetObjectInChosenDependencies) {
                                    setChoiceChosen(optionChosen);
                                    setChosenDependencies((prev: any) => {
                                        const newValue = [
                                            ...prev,
                                            targetObject,
                                        ];

                                        currentChosenDependencies = newValue;
                                        return newValue;
                                    });
                                } else {
                                    setChoiceChosen(optionChosen);
                                }
                            }
                        } else if (currentChoice && !currentChoice.chosen) {
                            const isTargetInChosenDependency =
                                currentChosenDependencies.some(
                                    (item: any) =>
                                        item.target === fieldObject.target &&
                                        item.targetValue ===
                                            !currentChoice.field
                                );

                            if (isTargetInChosenDependency) {
                                setChosenDependencies((prev: any) => {
                                    let newValue = [...prev];

                                    newValue = newValue.filter(
                                        (item: any) =>
                                            item.target !==
                                                fieldObject.target &&
                                            item.targetValue !==
                                                currentChoice.field
                                    );

                                    currentChosenDependencies = newValue;
                                    return newValue;
                                });
                            }
                        }
                    }
                };

                await setDependencyIfNone();
                await setChosenDependenciesIfNone();

                const newImage = { ...image };

                if (isMain !== image.is_main) {
                    newImage.is_main = isMain || false;
                }

                if (
                    JSON.stringify(currentDependency) !== "{}" &&
                    newImage[currentDependency.field] !==
                        currentDependency.value
                ) {
                    newImage[currentDependency.field] = currentDependency.value;
                }

                if (newImage.dependency !== currentDependencyType) {
                    newImage.dependency = currentDependencyType;
                }

                if (currentDependencyType === "glass availability") {
                    if (
                        newImage["glass_color_id"] &&
                        newImage["with_glass"] === null
                    ) {
                        newImage["with_glass"] = true;
                    } else if (
                        newImage["glass_color_id"] &&
                        newImage["with_glass"] === false
                    ) {
                        newImage["glass_color_id"] = null;
                    }
                }

                if (currentChosenDependencies.length > 0) {
                    currentChosenDependencies.forEach((dependency: any) => {
                        newImage[dependency.field] = dependency.value;
                        newImage[dependency.target] = dependency.targetValue;
                    });
                }

                const othersFields = optionFields.filter(
                    (field: any) => field.target !== currentDependency.field
                );

                optionFields.forEach((field: any) => {
                    const itemValue = newImage[field.target];

                    if (
                        currentDependencyType !==
                            formatDependencyType(field.field) &&
                        itemValue !== null
                    ) {
                        newImage[field.target] = null;
                    }
                });

                if (JSON.stringify(currentDependency) !== "{}") {
                    othersFields.forEach((field: any) => {
                        newImage[field.target] = null;
                    });
                }

                if (
                    Object.keys(newImage).some(
                        (key: string) => key === "undefined"
                    )
                ) {
                    delete newImage["undefined"];
                }

                setImage(newImage);
            } else {
                const setDependencies = async () => {
                    if (
                        JSON.stringify(currentDependency) === "{}" &&
                        currentDependencyType
                    ) {
                        const neededList = (await getElementAsync(
                            `.product-image-container:nth-child(${
                                imageIndex + 1
                            }) .product-image-fields .product-image-field:nth-child(3) ul.list-input`
                        )) as any;

                        const radioParent = neededList.querySelector("li");

                        const radio = radioParent.querySelector("input");

                        if (radio) {
                            radio.checked = true;
                        }

                        const dependencyFieldObject = selectOptions[
                            currentDependencyType
                        ].items.find(
                            (item: any) =>
                                item.field ===
                                tryParseValue(
                                    radioParent.getAttribute("data-type")
                                )
                        );

                        if (dependencyFieldObject) {
                            setCurrentDependency((prev: any) => ({
                                ...prev,
                                value: dependencyFieldObject.chosen.fieldValue,
                            }));

                            setChoiceChosen(dependencyFieldObject.chosen);
                        }
                    }

                    if (currentDependency.value !== choiceChosen.fieldValue) {
                        setChoiceChosen({});
                    }

                    if (
                        JSON.stringify(choiceChosen) !== "{}" &&
                        !chosenDependencies.some(
                            (dependency: any) =>
                                dependency.target ===
                                selectOptions[currentDependencyType].target
                        ) &&
                        selectOptions[choiceChosen.target]?.items.length > 0
                    ) {
                        const targetSelectedOption =
                            selectOptions[choiceChosen.target]?.items[0];

                        const neededList = (await getElementAsync(
                            `.product-image-container:nth-child(${
                                imageIndex + 1
                            }) .product-image-fields .product-image-field:nth-child(4) ul.list-input`
                        )) as any;

                        const radioParent = neededList.querySelector(
                            `li[data-type="${
                                targetSelectedOption.id ||
                                targetSelectedOption.field
                            }"]`
                        );

                        if (radioParent) {
                            const radio = radioParent.querySelector("input");

                            const targetValue = {
                                field: choiceChosen.target,
                                target: choiceChosen.field,
                                targetValue: choiceChosen.fieldValue,
                                value:
                                    targetSelectedOption.id ||
                                    targetSelectedOption.field,
                            };

                            if (
                                !chosenDependencies.some(
                                    (item: any) =>
                                        JSON.stringify(item) ===
                                        JSON.stringify(targetValue)
                                )
                            ) {
                                if (radio) {
                                    radio.checked = true;
                                }

                                setChosenDependencies((prev: any) => [
                                    ...prev,
                                    {
                                        field: choiceChosen.target,
                                        target: choiceChosen.field,
                                        targetValue: choiceChosen.fieldValue,
                                        value:
                                            targetSelectedOption.id ||
                                            targetSelectedOption.field,
                                    },
                                ]);
                            }
                        }
                    }
                };

                await setDependencies();

                if (currentFile && currentDependencyType && currentDependency) {
                    setImage(`file_${imageIndex + 1}`, currentFile);

                    const dependencyFieldType = formatDependencyType(
                        currentDependencyType
                    );

                    const dependencyObject = {
                        dependency: dependencyFieldType,
                        [currentDependency.field]: currentDependency.value,
                        is_main: isMain || false,
                    };

                    setImage(
                        `file_${imageIndex + 1}_dep`,
                        JSON.stringify(dependencyObject)
                    );
                }
            }
        };

        setUpFields();
    }, [
        currentDependencyType,
        currentDependency,
        isMain,
        chosenDependencies,
        currentFile,
    ]);

    return (
        <div className="product-image-container">
            {imageObject.photo ? (
                <img src={imageObject.photo} />
            ) : (
                <>
                    <img
                        src={
                            currentFile
                                ? (
                                      window.URL || window.webkitURL
                                  ).createObjectURL(currentFile)
                                : ""
                        }
                        onClick={openFileInput}
                    />
                    <input
                        style={{
                            width: 0,
                            height: 0,
                            display: "none",
                            opacity: 0,
                        }}
                        ref={imageInputRef}
                        type="file"
                        onChange={(e: any) => setCurrentFile(e.target.files[0])}
                    />
                </>
            )}

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
                                (fieldObject: any, index) => {
                                    const fieldDependency =
                                        formatDependencyType(fieldObject.field);
                                    return (
                                        <li
                                            key={`${fieldObject.field}[${index}]`}
                                        >
                                            <input
                                                name={`file_${
                                                    image.id || imageIndex + 1
                                                }`}
                                                type="radio"
                                                {...(action !== "add"
                                                    ? {
                                                          disabled:
                                                              action ===
                                                                  "show" ||
                                                              action ===
                                                                  "delete",
                                                      }
                                                    : {})}
                                                checked={
                                                    (currentDependencyType ||
                                                        imageObject.dependency) ===
                                                    fieldDependency
                                                }
                                                onChange={() => {
                                                    setCurrentDependencyType(
                                                        fieldDependency
                                                    );
                                                }}
                                            />
                                            {fieldObject.name}
                                        </li>
                                    );
                                }
                            )}
                    </ul>
                    Тип залежності
                </div>

                <div className="product-image-field">
                    <ul className="list-input">
                        {selectOptions[currentDependencyType]?.items.length >
                            0 &&
                            selectOptions[currentDependencyType]?.items.map(
                                (item: any, index: number) => {
                                    const fieldObject = (
                                        optionFields as any
                                    ).find(
                                        (item: any) =>
                                            formatDependencyType(item.field) ===
                                            currentDependencyType
                                    );

                                    const target = fieldObject.target;

                                    const isDefaultChecked =
                                        imageObject[target] ===
                                            (item.id || item.field) ||
                                        currentDependency.value ===
                                            (item.id || item.field);

                                    const onChangeFunc = () => {
                                        if (fieldObject.choices) {
                                            const currentChoice =
                                                fieldObject.choices.find(
                                                    (choice: any) =>
                                                        choice.field ===
                                                        item.field
                                                );

                                            if (!currentChoice.chosen) {
                                                setChoiceChosen({});
                                            } else {
                                                setChoiceChosen(
                                                    currentChoice.chosen
                                                );
                                            }
                                        } else {
                                            setChoiceChosen({});
                                        }

                                        if (target) {
                                            const newValue = {
                                                field: target,
                                                value: item.id || item.field,
                                            };

                                            if (
                                                JSON.stringify(
                                                    currentDependency
                                                ) !== JSON.stringify(newValue)
                                            ) {
                                                setCurrentDependency(newValue);
                                            }
                                        }
                                    };

                                    const isChecked =
                                        JSON.stringify(currentDependency) ===
                                        JSON.stringify({
                                            field: target,
                                            value: item.id || item.field,
                                        });

                                    return (
                                        <li
                                            key={`deps[${index}]`}
                                            data-type={item.id || item.field}
                                            className={
                                                isDefaultChecked ? "active" : ""
                                            }
                                        >
                                            <input
                                                name={`file_${
                                                    image.id || imageIndex + 1
                                                }_deps`}
                                                type="radio"
                                                {...(action !== "add"
                                                    ? {
                                                          disabled:
                                                              action ===
                                                                  "show" ||
                                                              action ===
                                                                  "delete",
                                                      }
                                                    : {})}
                                                checked={isChecked}
                                                onChange={onChangeFunc}
                                            />
                                            {item.name || item.dimensions}
                                        </li>
                                    );
                                }
                            )}
                    </ul>
                    Залежність
                </div>

                {JSON.stringify(choiceChosen) !== "{}" && (
                    <div className="product-image-field">
                        <ul className="list-input">
                            {selectOptions[choiceChosen.target]?.items.length >
                                0 &&
                                selectOptions[choiceChosen.target]?.items.map(
                                    (item: any, index: number) => {
                                        const target = choiceChosen.target;
                                        let currentChosenDependencies = [
                                            ...chosenDependencies,
                                        ];

                                        const isDefaultChecked =
                                            imageObject[target] ===
                                                (item.id || item.field) ||
                                            imageObject[choiceChosen.field] ===
                                                choiceChosen.fieldValue ||
                                            currentDependency.value ===
                                                item.id ||
                                            item.field;

                                        const isChecked =
                                            chosenDependencies.some(
                                                (choice: any) =>
                                                    choice.target ===
                                                        choiceChosen.field &&
                                                    choiceChosen.target ===
                                                        choice.field &&
                                                    choice.targetValue ===
                                                        choiceChosen.fieldValue
                                            );

                                        const targetObject = {
                                            field: target,
                                            target: choiceChosen.field,
                                            targetValue:
                                                choiceChosen.fieldValue,
                                            value: item.id || item.field,
                                        };

                                        const isChosenDependenciesIncludesCurrentItem =
                                            currentChosenDependencies.some(
                                                (item: any) => {
                                                    return (
                                                        JSON.stringify(item) ===
                                                        JSON.stringify(
                                                            targetObject
                                                        )
                                                    );
                                                }
                                            );

                                        return (
                                            <li
                                                key={`deps[${index}]`}
                                                data-type={
                                                    item.id || item.field
                                                }
                                                className={
                                                    isChecked ||
                                                    isDefaultChecked
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                <input
                                                    name={`file_${image.id}_sub_deps`}
                                                    type="radio"
                                                    {...(action !== "add"
                                                        ? {
                                                              disabled:
                                                                  action ===
                                                                      "show" ||
                                                                  action ===
                                                                      "delete",
                                                          }
                                                        : {})}
                                                    checked={
                                                        isChosenDependenciesIncludesCurrentItem
                                                    }
                                                    onChange={() => {
                                                        if (
                                                            target &&
                                                            !isChosenDependenciesIncludesCurrentItem
                                                        ) {
                                                            setChosenDependencies(
                                                                (prev: any) => {
                                                                    const newValue =
                                                                        [
                                                                            ...prev,
                                                                            targetObject,
                                                                        ];

                                                                    currentChosenDependencies =
                                                                        newValue;
                                                                    return newValue;
                                                                }
                                                            );
                                                        }
                                                    }}
                                                />
                                                {item.name || item.dimensions}
                                            </li>
                                        );
                                    }
                                )}
                        </ul>
                    </div>
                )}
            </div>

            <button
                className="delete"
                onClick={async () => {
                    await sendRequest("delete");
                }}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3 3L6 6M6 6L10 10M6 6V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18M6 6H4M10 10L14 14M10 10V17M14 14L18 18M14 14V17M18 18L21 21M18 6V12.3906M18 6H16M18 6H20M16 6L15.4558 4.36754C15.1836 3.55086 14.4193 3 13.5585 3H10.4415C9.94239 3 9.47572 3.18519 9.11861 3.5M16 6H11.6133"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default ProductImageInput;
