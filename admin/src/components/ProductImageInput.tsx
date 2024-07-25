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
    setIsValid,
    removeField,
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
    const [currentDependencyValue, setCurrentDependencyValue] =
        useState<any>(null);
    const [isMain, setIsMain] = useState(image.is_main);
    const [currentFile, setCurrentFile] = useState<any>(null);
    const imageInputRef = useRef<any>(null);

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

    const onDeleteButtonClick = async () => {
        if (imageObject.photo) {
            await sendRequest("delete");
        } else {
            removeField();
        }
    };

    const getCurrentDependencyValue = (imageObject: any) => {
        const currentDependency = imageObject.dependency;

        const field = optionFields.find(
            (field: any) =>
                formatDependencyType(field.field) === currentDependency
        );

        if (field?.target) {
            return image[field.target];
        }
    };

    useEffect(() => {
        setCurrentDependencyType(image.dependency);
        setIsMain(image.is_main);
        setCurrentDependencyValue(getCurrentDependencyValue(image));
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
        const setUpFields = async () => {
            let currentDependencyValueItem = currentDependencyValue;

            if (currentDependencyType && imageObject.photo) {
                const currentOptions =
                    selectOptions[currentDependencyType]?.items;

                const currentTarget =
                    selectOptions[currentDependencyType]?.target;

                if (currentOptions && currentTarget) {
                    const targetValue = JSON.parse(
                        JSON.stringify(currentDependencyValueItem) ||
                            JSON.stringify(imageObject[currentTarget])
                    );

                    const isValueInItems = currentOptions.some(
                        (item: any) => (item.id || item.field) === targetValue
                    );

                    if (!isValueInItems) {
                        currentDependencyValueItem = null;
                    } else {
                        currentDependencyValueItem = targetValue;
                    }
                }
            }

            const targetList = (await getElementAsync(
                `.product-image-container:nth-child(${
                    imageIndex + 1
                }) .product-image-fields .product-image-field:nth-child(3) ul.list-input`
            )) as any;

            if (currentDependencyValueItem !== null) {
                targetList.classList.remove("invalid");

                if (imageObject.photo) {
                    const newImage = { ...imageObject };

                    newImage.is_main = isMain || false;

                    if (currentDependencyType !== image.dependency) {
                        newImage.dependency = currentDependencyType;
                    }

                    if (
                        currentDependencyValueItem !==
                        getCurrentDependencyValue(image)
                    ) {
                        const field = optionFields.find(
                            (field: any) =>
                                formatDependencyType(field.field) ===
                                newImage.dependency
                        );

                        if (field?.target) {
                            newImage[field.target] = currentDependencyValueItem;
                        }
                    }

                    const clearOtherFields = () => {
                        const otherFields = optionFields.filter(
                            (field: any) =>
                                formatDependencyType(field.field) !==
                                currentDependencyType
                        );

                        otherFields.forEach((field: any) => {
                            newImage[field.target] = null;
                        });
                    };

                    clearOtherFields();

                    setCurrentDependencyValue(currentDependencyValueItem);
                    setImage(newImage);
                } else {
                    setIsValid(false);

                    const fileIndex = imageIndex + 1;

                    const targetDependencyTypeList = (await getElementAsync(
                        `.product-image-container:nth-child(${fileIndex}) .product-image-fields .product-image-field:nth-child(2) ul.list-input`
                    )) as any;

                    const targetImage = (await getElementAsync(
                        `.product-image-container:nth-child(${fileIndex}) img`
                    )) as any;

                    const targetDependencyList = (await getElementAsync(
                        `.product-image-container:nth-child(${
                            imageIndex + 1
                        }) .product-image-fields .product-image-field:nth-child(3) ul.list-input`
                    )) as any;

                    if (!currentFile) {
                        targetImage.classList.add("invalid");
                    } else {
                        targetImage.classList.remove("invalid");
                    }

                    if (!currentDependencyType) {
                        targetDependencyTypeList.classList.add("invalid");
                    } else {
                        targetDependencyTypeList.classList.remove("invalid");
                    }

                    if (!currentDependencyValueItem) {
                        targetDependencyList.classList.add("invalid");
                    } else {
                        targetDependencyList.classList.remove("invalid");
                    }

                    if (
                        !currentFile ||
                        !currentDependencyType ||
                        !currentDependencyValueItem
                    ) {
                        return;
                    }

                    if (
                        currentFile &&
                        currentDependencyType &&
                        JSON.stringify(currentDependencyValueItem)
                    ) {
                        setImage(`file_${fileIndex}`, currentFile);

                        const field = optionFields.find(
                            (field: any) =>
                                formatDependencyType(field.field) ===
                                currentDependencyType
                        );

                        const dependencyObject = {
                            dependency: currentDependencyType,
                            [field.target]: currentDependencyValueItem,
                            is_main: isMain || false,
                        };

                        setCurrentDependencyValue(currentDependencyValueItem);
                        setIsValid(true);
                        setImage(
                            `file_${fileIndex}_dep`,
                            JSON.stringify(dependencyObject)
                        );
                    }
                }
            } else {
                targetList.classList.add("invalid");
            }
        };

        setUpFields();
    }, [
        currentFile,
        currentDependencyType,
        currentDependencyValue,
        isMain,
        imageObject,
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
                        defaultChecked={isMain}
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
                                        currentDependencyValue ===
                                            (item.id || item.field);

                                    const newValue = item.id || item.field;

                                    const onChangeFunc = () => {
                                        if (target) {
                                            if (
                                                JSON.stringify(
                                                    currentDependencyValue
                                                ) !== JSON.stringify(newValue)
                                            ) {
                                                setCurrentDependencyValue(
                                                    newValue
                                                );
                                            }
                                        }
                                    };

                                    const isChecked =
                                        JSON.stringify(
                                            currentDependencyValue
                                        ) === JSON.stringify(newValue);

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
            </div>

            <button className="delete" onClick={onDeleteButtonClick}>
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
