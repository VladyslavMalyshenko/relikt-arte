import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentAction } from "../redux/actions/currentActionActions";
import { SetDeleteItem } from "../redux/actions/currentDeleteObjectActions";
import { SetCurrentItem } from "../redux/actions/currentItemActions";
import "../styles/components/ActionModal.scss";
import { InputField, InputFieldDependency } from "../types/categoriesTypes";
import { addItem } from "../utils/addItem";
import { bulkEdit } from "../utils/bulkEdit";
import { deleteItem } from "../utils/deleteItem";
import { editItem } from "../utils/editItem";
import { getItemWithNoDispatch } from "../utils/getItem";
import { getItems } from "../utils/getItems";
import Loader from "./Loader";
import OrderItem from "./OrderItem";
import ProductImageInput from "./ProductImageInput";

const ActionModal = () => {
    const action = useSelector((state: any) => state.actionReducer.action);
    const category = useSelector(
        (state: any) => state.categoryReducer.category
    );

    const item = useSelector((state: any) => state.itemReducer.item);
    const deleteObject = useSelector(
        (state: any) => state.deleteObjectReducer.object
    );
    const dispatch = useDispatch();
    const [selectOptions, setSelectOptions] = useState<any>({});
    const [selectedItems, setSelectedItems] = useState<any>({});
    const [fields, setFields] = useState<any>({});
    const [productImages, setProductImages] = useState<any>([]);
    const [isProductImageOpened, setIsProductImageOpened] = useState(false);
    const [addProductImages, setAddProductImages] = useState<any>([]);
    const addImagesFormDataRef = useRef<any>(new FormData());
    const [isAddProductImageOpened, setIsAddProductImageOpened] =
        useState(false);
    const [isAddProductImageValid, setIsAddProductImageValid] = useState<
        boolean[]
    >([]);
    const [productImageOptions, setProductImageOptions] = useState<any>([]);

    const closeProductPhotoAddWindow = () => {
        setIsAddProductImageOpened(false);
        setAddProductImages([]);
        if (action !== "add") {
            addImagesFormDataRef.current = new FormData();
        }
    };

    const getAddProductImageFormDataItemsCount = (formData: any) => {
        let counter = 0;

        for (const key of formData.keys()) {
            counter++;
        }

        return counter / 2;
    };

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
            choices: [
                { name: "Звичайний", field: "default" },
                { name: "Г-подібний", field: "L-shaped" },
            ],
        },
        {
            field: "glass_availability",
            target: "with_glass",

            choices: [
                {
                    name: "Присутнє",
                    field: true,
                },
                { name: "Відсутнє", field: false },
            ],
        },
    ];

    const {
        register,
        trigger,
        formState: { errors },
        getValues,
        reset,
        setValue,
    } = useForm();

    useEffect(() => {
        if (
            isAddProductImageOpened &&
            action === "add" &&
            getAddProductImageFormDataItemsCount(addImagesFormDataRef.current) >
                0
        ) {
            setAddProductImages((prev: any) => {
                const newValue = [...prev];

                const availableItems = getAddProductImageFormDataItemsCount(
                    addImagesFormDataRef.current
                );

                for (let i = 1; i <= availableItems; i++) {
                    const prefix = `file_${i}`;

                    const file = addImagesFormDataRef.current.get(prefix);

                    const info = JSON.parse(
                        addImagesFormDataRef.current.get(prefix + "_dep")
                    );

                    if (!newValue[i - 1]) {
                        newValue[i - 1] = {};
                    }

                    if (file) {
                        newValue[i - 1].defaultPhoto = file;
                    }

                    if (info) {
                        Object.keys(info).forEach((infoKey: string) => {
                            newValue[i - 1][infoKey] = info[infoKey];
                        });
                    }
                }

                return newValue;
            });
        }
    }, [isAddProductImageOpened]);

    useEffect(() => {
        const getNestedValue = (obj: any, path: string): any => {
            return path.split(".").reduce((acc, part) => acc && acc[part], obj);
        };

        const initializeFields = async (): Promise<void> => {
            if (!category.main && action !== "" && action !== "delete") {
                const lists = Array.from(
                    new Set([
                        ...category.inputFields,
                        ...category.addItemFields,
                    ])
                ).filter(
                    (field: InputField) =>
                        (field.type === "list" ||
                            field.type === "list-radio") &&
                        (field.getUrl || field.value)
                );

                for (const list of lists) {
                    const options = list.getUrl
                        ? await getItems(list.getUrl)
                        : list.value;

                    setSelectOptions((prev: any) => ({
                        ...prev,
                        [list.field_name || list.name]: [...options],
                    }));
                }

                const setCheckboxes = async (fieldObject: InputField) => {
                    const fieldName =
                        fieldObject.field_name || fieldObject.name;
                    setTimeout(() => {
                        const listChildren = Array.from(
                            document.getElementById(fieldName!)?.children || []
                        );

                        listChildren.forEach((child) => {
                            const input = child.querySelector("input") as any;

                            if (input) {
                                const inputIdNumberValue = +input
                                    .parentNode!.id.split("[")[1]
                                    .split("]")[0];
                                const value = !isNaN(inputIdNumberValue)
                                    ? inputIdNumberValue
                                    : input
                                          .parentNode!.id.split("[")[1]
                                          .split("]")[0];

                                const isSingleValue =
                                    typeof item[fieldName] === "number";

                                const isValueSelected = isSingleValue
                                    ? item[fieldName] !== undefined &&
                                      item[fieldName] !== null &&
                                      item[fieldName] === value
                                    : getNestedValue(item, fieldName)?.includes(
                                          value
                                      );

                                setSelectedItems((prev: any) => {
                                    const updated = { ...prev };
                                    if (!updated[fieldName]) {
                                        updated[fieldName] = [];
                                    }

                                    if (isValueSelected) {
                                        if (isSingleValue) {
                                            updated[fieldName] = value;
                                        } else {
                                            if (fieldName === "status") {
                                                updated[fieldName] = value;
                                            } else {
                                                updated[fieldName].push(value);
                                            }
                                        }
                                    } else {
                                        if (
                                            !isSingleValue &&
                                            Array.isArray(updated[fieldName])
                                        ) {
                                            updated[fieldName] = updated[
                                                fieldName
                                            ].filter(
                                                (objectValue: any) =>
                                                    objectValue !== value
                                            );
                                        }
                                    }

                                    input.checked = isValueSelected;
                                    setValue(fieldName, updated[fieldName]);
                                    return updated;
                                });
                            }
                        });
                    }, 100);

                    if (fieldObject.getItem && fieldObject.dependencies) {
                        const value = getNestedValue(item, fieldName) || "";

                        if (value) {
                            const currentItem: any =
                                await getItemWithNoDispatch(
                                    fieldObject.getItem,
                                    {
                                        id: value,
                                    }
                                );

                            fieldObject.dependencies.forEach(
                                (dependency: InputFieldDependency) => {
                                    const targetLabel: any =
                                        document.querySelector(
                                            `label[for="${dependency.target}"]`
                                        );

                                    if (targetLabel) {
                                        if (!currentItem[dependency.dependOn]) {
                                            targetLabel.style.setProperty(
                                                "display",
                                                "none"
                                            );
                                        } else {
                                            targetLabel.style.setProperty(
                                                "display",
                                                "inherit"
                                            );
                                        }
                                    }
                                }
                            );
                        }
                    }
                };

                if (action !== "add") {
                    if (category.inputFields) {
                        category.inputFields.forEach(
                            async (fieldObject: InputField) => {
                                const fieldName =
                                    fieldObject.field_name || fieldObject.name;
                                const value =
                                    fieldObject.type === "boolean" ||
                                    fieldObject.type === "list" ||
                                    fieldObject.type === "list-radio"
                                        ? getNestedValue(item, fieldName)
                                        : getNestedValue(item, fieldName) || "";

                                if (
                                    fieldObject.type === "list" ||
                                    fieldObject.type === "list-radio"
                                ) {
                                    console.log(fieldObject);

                                    await setCheckboxes(fieldObject);
                                }

                                if (fieldObject.type === "multiple-field") {
                                    const nestedValue = getNestedValue(
                                        item,
                                        fieldName
                                    );

                                    const formattedFields = nestedValue
                                        ? nestedValue.map(
                                              (val: any, index: number) => ({
                                                  id: `${fieldName}[${index}]`,
                                                  value: val,
                                              })
                                          )
                                        : [
                                              {
                                                  id: `${fieldName}[0]`,
                                                  value: "",
                                              },
                                          ];

                                    setFields((prev: any) => {
                                        const newFields = {
                                            ...prev,
                                            [fieldName]: formattedFields,
                                        };

                                        setSelectedItems((prev: any) => {
                                            const updatedSelected = { ...prev };
                                            if (!updatedSelected[fieldName]) {
                                                updatedSelected[fieldName] = [];
                                            }

                                            updatedSelected[fieldName] =
                                                newFields[fieldName].map(
                                                    (field: any) => field.value
                                                );

                                            setValue(
                                                fieldName,
                                                updatedSelected[fieldName]
                                            );
                                            return updatedSelected;
                                        });

                                        return newFields;
                                    });
                                }

                                if (
                                    fieldObject.type === "product-image" &&
                                    item.photos
                                ) {
                                    setProductImages([
                                        ...item.photos.map((f: any) =>
                                            JSON.parse(JSON.stringify(f))
                                        ),
                                    ]);
                                }

                                setValue(fieldName, value);
                            }
                        );
                    }

                    if (category.addItemFields) {
                        category.addItemFields.forEach(
                            async (itemField: InputField) => {
                                const fieldName =
                                    itemField.field_name || itemField.name;
                                const value =
                                    itemField.type === "boolean" ||
                                    itemField.type === "list" ||
                                    itemField.type === "list-radio"
                                        ? getNestedValue(item, fieldName)
                                        : getNestedValue(item, fieldName) || "";

                                if (
                                    itemField.type === "list" ||
                                    itemField.type === "list-radio"
                                ) {
                                    await setCheckboxes(itemField);
                                }

                                if (itemField.type === "multiple-field") {
                                    const nestedValue = getNestedValue(
                                        item,
                                        fieldName
                                    );

                                    const formattedFields = nestedValue
                                        ? nestedValue.map(
                                              (val: any, index: number) => ({
                                                  id: `${fieldName}[${index}]`,
                                                  value: val,
                                              })
                                          )
                                        : [
                                              {
                                                  id: `${fieldName}[0]`,
                                                  value: "",
                                              },
                                          ];

                                    setFields((prev: any) => {
                                        const newFields = {
                                            ...prev,
                                            [fieldName]: formattedFields,
                                        };

                                        setSelectedItems((prev: any) => {
                                            const updatedSelected = { ...prev };
                                            if (!updatedSelected[fieldName]) {
                                                updatedSelected[fieldName] = [];
                                            }

                                            updatedSelected[fieldName] =
                                                newFields[fieldName].map(
                                                    (field: any) => field.value
                                                );

                                            setValue(
                                                fieldName,
                                                updatedSelected[fieldName]
                                            );
                                            return updatedSelected;
                                        });

                                        return newFields;
                                    });
                                }

                                if (
                                    itemField.type === "product-image" &&
                                    item.photos
                                ) {
                                    setProductImages([
                                        ...item.photos.map((f: any) =>
                                            JSON.parse(JSON.stringify(f))
                                        ),
                                    ]);
                                }

                                setValue(fieldName, value);
                            }
                        );
                    }
                } else {
                    if (category.inputFields) {
                        category.inputFields.forEach(
                            (fieldObject: InputField) => {
                                const fieldName =
                                    fieldObject.field_name || fieldObject.name;
                                const value =
                                    typeof getNestedValue(
                                        item,
                                        fieldObject.field_name ||
                                            fieldObject.name
                                    ) === "boolean"
                                        ? false
                                        : "";

                                if (fieldObject.type === "multiple-field") {
                                    setFields((prev: any) => ({
                                        ...prev,
                                        [fieldName]: [
                                            {
                                                id: `${fieldName}[0]`,
                                                value: "",
                                            },
                                        ],
                                    }));
                                }

                                setValue(fieldName, value);
                            }
                        );
                    }

                    if (category.addItemFields) {
                        category.addItemFields.forEach(
                            (itemField: InputField) => {
                                const fieldName =
                                    itemField.field_name || itemField.name;
                                const value =
                                    itemField.type === "boolean" ? false : "";

                                if (itemField.type === "multiple-field") {
                                    setFields((prev: any) => ({
                                        ...prev,
                                        [fieldName]: [
                                            {
                                                id: `${fieldName}[0]`,
                                                value: "",
                                            },
                                        ],
                                    }));
                                }

                                setValue(fieldName, value);
                            }
                        );
                    }

                    reset();
                }
            }
        };

        initializeFields();
    }, [item, action, category, setValue]);

    useEffect(() => {
        const setUpOptions = async () => {
            let newOptions = {};

            for (const optionField of productImageOptionsFields) {
                const items = optionField.getUrl
                    ? await getItems(optionField.getUrl)
                    : optionField.choices;

                const optionFieldName =
                    optionField.field === "type_of_platband" ||
                    optionField.field === "glass_availability"
                        ? optionField.field
                              .split("_")
                              .filter((item: string) => item)
                              .join(" ")
                        : optionField.field;

                newOptions = {
                    ...newOptions,
                    [optionFieldName]: {
                        target: optionField.target,
                        items,
                    },
                };

                if (optionField.choices) {
                    const choicesWithChosen = (optionField.choices as any[])
                        .map((choice: any) => choice.chosen)
                        .filter((choice: any) => choice);

                    if (choicesWithChosen.length > 0) {
                        for (const chosen of choicesWithChosen) {
                            const items = chosen.getUrl
                                ? await getItems(chosen.getUrl)
                                : chosen.choices;

                            newOptions = {
                                ...newOptions,
                                [chosen.target]: {
                                    target: chosen.target,
                                    items,
                                },
                            };
                        }
                    }
                }
            }

            setProductImageOptions(newOptions);
        };

        if (isProductImageOpened) {
            setUpOptions();
        }
    }, [isProductImageOpened]);

    const closeModal = () => {
        setIsAddProductImageOpened(false);
        setIsProductImageOpened(false);
        dispatch(SetCurrentAction(""));
        dispatch(SetCurrentItem({}));
        setSelectedItems({});
        setSelectOptions({});
        setProductImages([]);
        reset();
    };

    const getDeleteWindow = () => (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="currentColor"
                version="1.1"
                id="Layer_1"
                viewBox="0 0 511.999 511.999"
                xmlSpace="preserve"
            >
                <path d="M506.43,421.536L291.573,49.394c-15.814-27.391-55.327-27.401-71.147,0L5.568,421.536    c-15.814,27.391,3.934,61.616,35.574,61.616h429.714C502.485,483.153,522.25,448.938,506.43,421.536z M274.821,385.034    c0,10.394-8.427,18.821-18.821,18.821s-18.821-8.427-18.821-18.821v-11.239c0-10.394,8.427-18.821,18.821-18.821    s18.821,8.427,18.821,18.821V385.034z M274.821,311.702c0,10.394-8.427,18.821-18.821,18.821s-18.821-8.427-18.821-18.821v-107.89    c0-10.394,8.427-18.821,18.821-18.821s18.821,8.427,18.821,18.821V311.702z" />
            </svg>

            <p>
                При видаленні об'єкту з номером{" "}
                {deleteObject?.item?.id || item.id}, його не можна буде
                повернути. Також будуть видалені УСІ ПОВ'ЯЗАНІ З ЦИМ ОБ'ЄКТОМ
                ОБ'ЄКТИ. Ці дії НЕ ЗВОРОТНІ!
                {deleteObject?.item
                    ? " Якщо ви видалете цей об'єкт зараз, то усі зміни до цього ЗНИКНУТЬ!"
                    : ""}
            </p>
            <p>
                Ви дійсно хочете видалити {deleteObject?.item?.id || item.id}?
            </p>
        </>
    );

    const getInput = (fieldObject: InputField) => {
        const fieldName = fieldObject.field_name || fieldObject.name;

        return (fieldObject.type === "list" ||
            fieldObject.type === "list-radio") &&
            (fieldObject.getUrl || fieldObject.value) ? (
            <ul className="list-input" id={fieldName}>
                {selectOptions[fieldName]?.length > 0 &&
                    selectOptions[fieldName].map((option: any) => (
                        <li
                            key={option.id || option.value}
                            id={`${fieldName}[${option.id || option.value}]`}
                        >
                            <input
                                name={fieldObject.field_name}
                                type={
                                    fieldObject.type === "list"
                                        ? "checkbox"
                                        : "radio"
                                }
                                {...(action !== "add"
                                    ? {
                                          disabled:
                                              action === "show" ||
                                              action === "delete" ||
                                              fieldObject.locked,
                                      }
                                    : {})}
                                onChange={async (e) => {
                                    if (
                                        e.target.checked &&
                                        fieldObject.getItem &&
                                        fieldObject.dependencies
                                    ) {
                                        const currentItem: any =
                                            await getItemWithNoDispatch(
                                                fieldObject.getItem,
                                                {
                                                    id: option.id,
                                                }
                                            );

                                        fieldObject.dependencies.forEach(
                                            (
                                                dependency: InputFieldDependency
                                            ) => {
                                                const targetLabel: any =
                                                    document.querySelector(
                                                        `label[for="${dependency.target}"]`
                                                    );

                                                if (targetLabel) {
                                                    if (
                                                        !currentItem[
                                                            dependency.dependOn
                                                        ]
                                                    ) {
                                                        targetLabel.style.setProperty(
                                                            "display",
                                                            "none"
                                                        );
                                                    } else {
                                                        targetLabel.style.setProperty(
                                                            "display",
                                                            "inherit"
                                                        );
                                                    }
                                                }
                                            }
                                        );
                                    }

                                    setSelectedItems((prev: any) => {
                                        const updated = {
                                            ...prev,
                                        };

                                        if (fieldObject.type === "list") {
                                            if (!updated[fieldName]) {
                                                updated[fieldName] = [];
                                            }
                                            if (e.target.checked) {
                                                updated[fieldName].push(
                                                    option.id
                                                );
                                            } else {
                                                updated[fieldName] = updated[
                                                    fieldName
                                                ].filter(
                                                    (value: any) =>
                                                        value !== option.id ||
                                                        option.value
                                                );
                                            }
                                        } else {
                                            if (!updated[fieldName]) {
                                                updated[fieldName] = 0;
                                            }
                                            if (e.target.checked) {
                                                updated[fieldName] =
                                                    option.id || option.value;
                                            }
                                        }

                                        setValue(fieldName, updated[fieldName]);
                                        return updated;
                                    });
                                }}
                            />
                            {fieldObject &&
                                fieldObject.labelField &&
                                option[fieldObject.labelField]}
                        </li>
                    ))}
            </ul>
        ) : fieldObject.type === "order-items" ? (
            item?.items?.results.length > 0 ? (
                item?.items?.results.map((item: any) => (
                    <OrderItem product={item} />
                ))
            ) : (
                <p>Сталася помилка. Ми не змогли завантажити товари ;(</p>
            )
        ) : fieldObject.type === "multiple-field" ? (
            <>
                {fields[fieldName]?.length > 0 &&
                    fields[fieldName].map((field: any) => (
                        <input
                            key={field.id}
                            value={field.value}
                            name={fieldName}
                            readOnly={
                                ((action === "show" || action === "delete") &&
                                    typeof item[fieldName] !== "boolean") ||
                                fieldName === "id" ||
                                fieldObject.locked
                            }
                            disabled={
                                ((action === "show" || action === "delete") &&
                                    typeof item[fieldName] === "boolean") ||
                                fieldObject.locked
                            }
                            type={
                                typeof item[fieldName] === "boolean"
                                    ? "checkbox"
                                    : fieldObject.type || "text"
                            }
                            placeholder={fieldObject.name}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setFields((prevFields: any) => {
                                    const updatedFields = prevFields[
                                        fieldName
                                    ].map((prevField: any) => {
                                        return prevField.id === field.id
                                            ? {
                                                  ...prevField,
                                                  value: newValue,
                                              }
                                            : prevField;
                                    });

                                    const updated = {
                                        ...prevFields,
                                        [fieldName]: updatedFields,
                                    };

                                    setSelectedItems((prev: any) => {
                                        const updatedSelected = { ...prev };
                                        if (!updatedSelected[fieldName]) {
                                            updatedSelected[fieldName] = [];
                                        }
                                        if (newValue) {
                                            updatedSelected[fieldName] = [
                                                ...updatedSelected[
                                                    fieldName
                                                ].filter(
                                                    (value: any) =>
                                                        value !== field.value
                                                ),
                                                newValue,
                                            ];
                                        } else {
                                            updatedSelected[fieldName] =
                                                updatedSelected[
                                                    fieldName
                                                ].filter(
                                                    (value: any) =>
                                                        value !== field.value
                                                );
                                        }
                                        setValue(
                                            fieldName,
                                            updatedSelected[fieldName]
                                        );
                                        return updatedSelected;
                                    });

                                    return updated;
                                });
                            }}
                        />
                    ))}

                {action !== "show" && (
                    <button
                        onClick={() => {
                            setFields((prevFields: any) => {
                                const data = {
                                    ...prevFields,
                                    [fieldName]: [
                                        ...prevFields[fieldName],
                                        {
                                            id: `${fieldName}[${prevFields[fieldName].length}]`,
                                            value: "",
                                        },
                                    ],
                                };

                                return data;
                            });
                        }}
                    >
                        Додати нове поле
                    </button>
                )}
            </>
        ) : fieldObject.type === "product-image" ? (
            <>
                {(action === "edit" || action === "show") &&
                    productImages?.find((image: any) => image.is_main)
                        ?.photo && (
                        <div className="product-image-preview">
                            <img
                                src={
                                    productImages.find(
                                        (image: any) => image.is_main
                                    )?.photo
                                }
                            />
                        </div>
                    )}

                <button onClick={() => setIsProductImageOpened(true)}>
                    Переглянути
                </button>

                {isProductImageOpened && (
                    <div
                        onMouseDown={() => setIsProductImageOpened(false)}
                        className="action-modal-container no-background"
                    >
                        <div
                            className="action-modal"
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <div className="action-modal-content not-main">
                                {productImages.length > 0 &&
                                    productImages.map(
                                        (
                                            imageObject: any,
                                            imageIndex: number
                                        ) => (
                                            <ProductImageInput
                                                image={imageObject}
                                                imageIndex={imageIndex}
                                                key={`${
                                                    fieldName + imageObject.id
                                                }`}
                                                selectOptions={
                                                    productImageOptions
                                                }
                                                optionFields={
                                                    productImageOptionsFields
                                                }
                                                setImage={(data: any) =>
                                                    setProductImages(
                                                        (prev: any) => {
                                                            prev[imageIndex] =
                                                                data;

                                                            return prev;
                                                        }
                                                    )
                                                }
                                            />
                                        )
                                    )}
                                {action !== "show" && (
                                    <button
                                        className="add-item"
                                        onClick={() => {
                                            setIsAddProductImageOpened(true);
                                            setIsProductImageOpened(false);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            fill="currentColor"
                                            version="1.1"
                                            viewBox="0 0 490 490"
                                            xmlSpace="preserve"
                                        >
                                            <path d="M227.8,174.1v53.7h-53.7c-9.5,0-17.2,7.7-17.2,17.2s7.7,17.2,17.2,17.2h53.7v53.7c0,9.5,7.7,17.2,17.2,17.2     s17.1-7.7,17.1-17.2v-53.7h53.7c9.5,0,17.2-7.7,17.2-17.2s-7.7-17.2-17.2-17.2h-53.7v-53.7c0-9.5-7.7-17.2-17.1-17.2     S227.8,164.6,227.8,174.1z" />
                                            <path d="M71.7,71.7C25.5,118,0,179.5,0,245s25.5,127,71.8,173.3C118,464.5,179.6,490,245,490s127-25.5,173.3-71.8     C464.5,372,490,310.4,490,245s-25.5-127-71.8-173.3C372,25.5,310.5,0,245,0C179.6,0,118,25.5,71.7,71.7z M455.7,245     c0,56.3-21.9,109.2-61.7,149s-92.7,61.7-149,61.7S135.8,433.8,96,394s-61.7-92.7-61.7-149S56.2,135.8,96,96s92.7-61.7,149-61.7     S354.2,56.2,394,96S455.7,188.7,455.7,245z" />
                                        </svg>
                                    </button>
                                )}

                                <div className="action-modal-buttons">
                                    <button
                                        className={"show"}
                                        onClick={() =>
                                            setIsProductImageOpened(false)
                                        }
                                    >
                                        Повернутись
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isAddProductImageOpened && action !== "show" ? (
                    <div
                        onMouseDown={closeProductPhotoAddWindow}
                        className="action-modal-container no-background"
                    >
                        <div
                            className="action-modal"
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <div className="action-modal-content not-main ">
                                {(getAddProductImageFormDataItemsCount(
                                    addImagesFormDataRef.current
                                ) || addProductImages.length) > 0 &&
                                    addProductImages.map(
                                        (
                                            imageObject: any,
                                            imageIndex: number
                                        ) => (
                                            <ProductImageInput
                                                image={imageObject}
                                                imageIndex={imageIndex}
                                                key={`${
                                                    fieldName +
                                                    (imageObject.id ||
                                                        imageIndex + 1)
                                                }`}
                                                selectOptions={
                                                    productImageOptions
                                                }
                                                optionFields={
                                                    productImageOptionsFields
                                                }
                                                setImage={(
                                                    key: string,
                                                    value: any
                                                ) => {
                                                    if (
                                                        key &&
                                                        (typeof value !==
                                                            "object" ||
                                                            value instanceof
                                                                File) &&
                                                        !Array.isArray(value)
                                                    ) {
                                                        addImagesFormDataRef.current.set(
                                                            key,
                                                            value
                                                        );
                                                    }
                                                }}
                                                setIsValid={(value: boolean) =>
                                                    setIsAddProductImageValid(
                                                        (prev: any) => {
                                                            const newValue = [
                                                                ...prev,
                                                            ];

                                                            newValue[
                                                                imageIndex
                                                            ] = value;

                                                            return newValue;
                                                        }
                                                    )
                                                }
                                                removeField={() =>
                                                    setAddProductImages(
                                                        (prev: any) => {
                                                            const newValue = [
                                                                ...prev,
                                                            ];

                                                            newValue.splice(
                                                                imageIndex,
                                                                1
                                                            );

                                                            return newValue;
                                                        }
                                                    )
                                                }
                                            />
                                        )
                                    )}
                                <button
                                    onClick={() =>
                                        setAddProductImages((prev: any) => [
                                            ...prev,
                                            {},
                                        ])
                                    }
                                >
                                    Додати зображення
                                </button>
                                <div className="action-modal-buttons">
                                    <button
                                        className={"show"}
                                        onClick={closeProductPhotoAddWindow}
                                    >
                                        Повернутися
                                    </button>

                                    {action !== "add" && (
                                        <button
                                            className={"add"}
                                            onClick={async () => {
                                                const newItem = await addItem(
                                                    fieldObject.postUrl as string,
                                                    addImagesFormDataRef.current,
                                                    { id: item.id }
                                                );

                                                if (newItem) {
                                                    closeProductPhotoAddWindow();
                                                }
                                            }}
                                            disabled={
                                                !isAddProductImageValid.every(
                                                    (item: any) => item
                                                )
                                            }
                                        >
                                            Додати
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </>
        ) : (
            <input
                {...register(fieldName, {
                    required: fieldObject.required || false,
                })}
                {...(action !== "add"
                    ? {
                          readOnly:
                              ((action === "show" || action === "delete") &&
                                  typeof item[fieldName] !== "boolean") ||
                              fieldName === "id" ||
                              fieldObject.locked,
                          disabled:
                              ((action === "show" || action === "delete") &&
                                  typeof item[fieldName] === "boolean") ||
                              fieldObject.locked,
                      }
                    : {})}
                type={
                    typeof item[fieldName] === "boolean"
                        ? "checkbox"
                        : fieldObject.type || "text"
                }
                placeholder={fieldObject.name}
            />
        );
    };

    const getButtons = () => {
        const handleErrors = async () => {
            await trigger();

            console.log(getValues());

            let invalidFieldsElements = [
                ...category.addItemFields.map((field: InputField) => {
                    const fieldName = field.field_name || field.name;
                    const labelElement = document.querySelector(
                        `label[for="${fieldName}"]`
                    ) as any;

                    const fieldElement: any =
                        labelElement?.querySelector(`ul#${fieldName}`) ||
                        labelElement?.querySelector(
                            `input[name="${fieldName}"]`
                        );

                    if (fieldElement) {
                        let fieldValue =
                            fieldElement?.value ||
                            (fieldElement.nodeName === "UL" &&
                                selectedItems[fieldName]);

                        const isFieldInvalid =
                            field.required &&
                            (fieldValue === undefined ||
                                fieldValue === null ||
                                fieldValue === "" ||
                                fieldValue?.length < 1) &&
                            labelElement.style.display !== "none";

                        return isFieldInvalid ? fieldElement : undefined;
                    }

                    return;
                }),
            ];

            console.log(invalidFieldsElements);
            console.log(errors);

            if (errors && Object.keys(errors).length > 0) {
                invalidFieldsElements.push(
                    ...category.inputFields.map((fieldObject: InputField) => {
                        const fieldName =
                            fieldObject.field_name || fieldObject.name;

                        const isFieldInCategoryFields =
                            Object.keys(errors).includes(fieldName);

                        if (isFieldInCategoryFields) {
                            const labelElement = document.querySelector(
                                `label[for="${fieldName}"]`
                            ) as any;

                            if (labelElement.style.display !== "none") {
                                const fieldElement: any =
                                    labelElement?.querySelector(
                                        `ul#${fieldName}`
                                    ) ||
                                    labelElement?.querySelector(
                                        `input[name="${fieldName}"]`
                                    );

                                if (
                                    fieldElement.type !== "checkbox" &&
                                    fieldElement.type !== "radio"
                                ) {
                                    return fieldElement;
                                }
                            }
                        }

                        return;
                    })
                );
            }

            invalidFieldsElements = invalidFieldsElements.filter(
                (field) => field
            );

            category.inputFields.forEach((fieldObject: InputField) => {
                const fieldName = fieldObject.field_name || fieldObject.name;

                const labelElement = document.querySelector(
                    `label[for="${fieldName}"]`
                );

                const fieldElement: any =
                    labelElement?.querySelector(`ul#${fieldName}`) ||
                    labelElement?.querySelector(`input[name="${fieldName}"]`);

                if (
                    fieldElement &&
                    fieldElement.classList.contains("invalid") &&
                    !invalidFieldsElements.includes(fieldElement)
                ) {
                    fieldElement.classList.remove("invalid");
                }
            });

            invalidFieldsElements.forEach((fieldElement: any) => {
                if (fieldElement) {
                    fieldElement.classList.add("invalid");

                    const actionModalContent = document.querySelector(
                        ".action-modal-content"
                    );

                    if (actionModalContent) {
                        actionModalContent.scrollTop =
                            fieldElement.offsetTop -
                            fieldElement.parentNode.clientHeight;
                    }
                }
            });

            return invalidFieldsElements.length > 0;
        };

        const handleSuccess = async () => {
            if (action === "show") {
                closeModal();

                return;
            } else if (action === "delete") {
                if (JSON.stringify(deleteObject) !== "{}") {
                    await deleteItem(
                        deleteObject?.url || category.deleteUrl,
                        {
                            id: deleteObject?.item?.id || item.id,
                        },
                        "edit"
                    );

                    dispatch(SetDeleteItem({}));
                } else {
                    await deleteItem(category.deleteUrl, {
                        id: item.id,
                    });
                }

                if (isProductImageOpened || isAddProductImageOpened) {
                    setIsProductImageOpened(false);
                    setIsAddProductImageOpened(false);
                }

                return;
            }

            const data = getValues();
            const isAnyError = await handleErrors();

            if (!isAnyError) {
                delete data.field;

                if (action === "edit") {
                    const prepareItem = async (
                        obj: any,
                        categoryFields: InputField[],
                        originalItem: any
                    ) => {
                        const cleanObj = { ...obj };

                        console.log("CLEAN: ", cleanObj);

                        const handleProductPhotos = async () => {
                            if (originalItem?.photos) {
                                const photos = productImages.map(
                                    (item: any) => item
                                );

                                const clearPhotos = photos
                                    .map(
                                        (
                                            newPhoto: any,
                                            index: number,
                                            currentPhotos: any
                                        ) => {
                                            const initialPhotoObject =
                                                originalItem.photos.find(
                                                    (originalPhoto: any) =>
                                                        originalPhoto.id ===
                                                        newPhoto.id
                                                );

                                            if (
                                                !newPhoto ||
                                                !initialPhotoObject
                                            ) {
                                                return;
                                            }

                                            if (
                                                JSON.stringify(newPhoto) ===
                                                JSON.stringify(
                                                    initialPhotoObject
                                                )
                                            ) {
                                                currentPhotos.splice(index, 1);

                                                return;
                                            } else {
                                                const photoKeys =
                                                    Object.keys(
                                                        initialPhotoObject
                                                    );

                                                photoKeys.forEach(
                                                    (key: string) => {
                                                        if (
                                                            key !== "id" &&
                                                            newPhoto[key] ===
                                                                initialPhotoObject[
                                                                    key
                                                                ]
                                                        ) {
                                                            delete newPhoto[
                                                                key
                                                            ];
                                                        }
                                                    }
                                                );
                                            }

                                            return newPhoto;
                                        }
                                    )
                                    .filter(
                                        (newPhoto: any) =>
                                            newPhoto &&
                                            Object.keys(newPhoto).length > 1
                                    );

                                const fieldObject = categoryFields.find(
                                    (field) => field.type === "product-image"
                                ) as any;

                                if (
                                    fieldObject.updateUrl &&
                                    clearPhotos.length > 0
                                ) {
                                    await bulkEdit(
                                        fieldObject.updateUrl,
                                        clearPhotos,
                                        ["id"]
                                    );
                                }
                            }
                        };

                        await handleProductPhotos();

                        const isFieldInCategory = (fieldName: string) =>
                            categoryFields.some(
                                (field: InputField) =>
                                    (field.field_name || field.name) ===
                                    fieldName
                            );

                        const recursiveClean = (currentObj: any, path = "") => {
                            Object.keys(currentObj).forEach((key) => {
                                const fullPath = path ? `${path}.${key}` : key;
                                const value = currentObj[key];

                                if (
                                    typeof value === "object" &&
                                    value !== null &&
                                    !Array.isArray(value)
                                ) {
                                    if (
                                        Object.keys(currentObj[key]).length ===
                                        0
                                    ) {
                                        delete currentObj[key];
                                    }
                                } else {
                                    const labelElement = document.querySelector(
                                        `label[for="${fullPath}"]`
                                    ) as any;

                                    console.log(
                                        fullPath,
                                        isFieldInCategory(fullPath)
                                    );

                                    if (
                                        !isFieldInCategory(fullPath) ||
                                        (value === originalItem?.[fullPath] &&
                                            typeof value !== "boolean" &&
                                            labelElement.style.display !==
                                                "none") ||
                                        value === undefined ||
                                        value === null ||
                                        value === "" ||
                                        (typeof value === "object" &&
                                            Object.keys(value).length === 0) ||
                                        (Array.isArray(value) &&
                                            value.length === 0)
                                    ) {
                                        delete currentObj[key];
                                    } else if (
                                        labelElement &&
                                        labelElement.style.display === "none"
                                    ) {
                                        const fieldObject = categoryFields.find(
                                            (field: InputField) =>
                                                (field.field_name ||
                                                    field.name) === fullPath
                                        ) as InputField;

                                        const isEmpty =
                                            currentObj[key] === undefined ||
                                            currentObj[key] === null ||
                                            currentObj[key] === "";

                                        if (
                                            (fieldObject.required && isEmpty) ||
                                            (typeof currentObj[key] ===
                                                "boolean" &&
                                                currentObj[key] === true)
                                        ) {
                                            currentObj[key] =
                                                fieldObject.type === "text"
                                                    ? ""
                                                    : fieldObject.type ===
                                                          "boolean" ||
                                                      fieldObject.type ===
                                                          "checkbox" ||
                                                      fieldObject.type ===
                                                          "radio"
                                                    ? false
                                                    : [];
                                        } else if (!fieldObject.required) {
                                            delete currentObj[key];
                                        }
                                    }
                                }
                            });
                        };

                        recursiveClean(cleanObj);

                        return cleanObj;
                    };

                    const newItem = await prepareItem(
                        data,
                        Array.from(
                            new Set([
                                ...category.addItemFields,
                                ...category.inputFields,
                            ])
                        ),
                        item
                    );

                    await editItem(category.editUrl, newItem, {
                        id: item.id,
                    });
                } else if (action === "add") {
                    let newItem = { ...data };

                    category.addItemFields.forEach(
                        (fieldObject: InputField) => {
                            const itemKey =
                                fieldObject.field_name || fieldObject.name;

                            const labelElement = document.querySelector(
                                `label[for='${itemKey}']`
                            ) as any;

                            if (
                                (newItem[itemKey] &&
                                    !category.addItemFields.some(
                                        (field: InputField) =>
                                            (field.field_name || field.name) ===
                                            itemKey
                                    )) ||
                                newItem[itemKey] === undefined ||
                                newItem[itemKey] === null ||
                                newItem[itemKey] === "" ||
                                (labelElement &&
                                    labelElement.style.display === "none")
                            ) {
                                const cleanEmptyFields = (obj: any): any => {
                                    const isObject = (val: any) =>
                                        val &&
                                        typeof val === "object" &&
                                        !Array.isArray(val);

                                    const cleanedObj = Object.keys(obj).reduce(
                                        (acc: any, key: string) => {
                                            const value = obj[key];

                                            if (
                                                value === "" ||
                                                value === null ||
                                                value === undefined
                                            ) {
                                                return acc;
                                            }

                                            if (isObject(value)) {
                                                const cleanedNestedObj =
                                                    cleanEmptyFields(value);
                                                if (
                                                    Object.keys(
                                                        cleanedNestedObj
                                                    ).length > 0
                                                ) {
                                                    acc[key] = cleanedNestedObj;
                                                }
                                            } else {
                                                acc[key] = value;
                                            }

                                            return acc;
                                        },
                                        {}
                                    );

                                    return cleanedObj;
                                };

                                const removeEmptyFields = (
                                    obj: any,
                                    categoryFields: InputField[]
                                ) => {
                                    const isFieldInCategory = (
                                        fieldName: string
                                    ) =>
                                        categoryFields.some(
                                            (field: InputField) =>
                                                (field.field_name ||
                                                    field.name) === fieldName
                                        );

                                    const recursiveClean = (
                                        currentObj: any,
                                        path = ""
                                    ) => {
                                        Object.keys(currentObj).forEach(
                                            (key) => {
                                                const fullPath = path
                                                    ? `${path}.${key}`
                                                    : key;
                                                const value = currentObj[key];

                                                if (
                                                    typeof value === "object" &&
                                                    value !== null &&
                                                    !Array.isArray(value)
                                                ) {
                                                    recursiveClean(
                                                        value,
                                                        fullPath
                                                    );

                                                    if (
                                                        Object.keys(
                                                            currentObj[key]
                                                        ).length === 0
                                                    ) {
                                                        delete currentObj[key];
                                                    }
                                                } else {
                                                    const labelElement =
                                                        document.querySelector(
                                                            `label[for='${key}']`
                                                        ) as any;

                                                    if (
                                                        !isFieldInCategory(
                                                            fullPath
                                                        ) ||
                                                        value === undefined ||
                                                        value === null ||
                                                        value === "" ||
                                                        (typeof value ===
                                                            "object" &&
                                                            Object.keys(value)
                                                                .length ===
                                                                0) ||
                                                        (Array.isArray(value) &&
                                                            value.length === 0)
                                                    ) {
                                                        delete currentObj[key];
                                                    } else if (
                                                        labelElement &&
                                                        labelElement.style
                                                            .display === "none"
                                                    ) {
                                                        const fieldObject =
                                                            categoryFields.find(
                                                                (
                                                                    field: InputField
                                                                ) =>
                                                                    (field.field_name ||
                                                                        field.name) ===
                                                                    fullPath
                                                            ) as InputField;

                                                        const isBooleanAndTrue =
                                                            typeof currentObj[
                                                                key
                                                            ] === "boolean" &&
                                                            currentObj[key] ===
                                                                true &&
                                                            labelElement.style
                                                                .display ===
                                                                "none";

                                                        const fieldEmpty =
                                                            currentObj[key] ===
                                                                undefined ||
                                                            currentObj[key] ===
                                                                null ||
                                                            currentObj[key] ===
                                                                "" ||
                                                            isBooleanAndTrue;

                                                        if (
                                                            fieldObject.required &&
                                                            fieldEmpty
                                                        ) {
                                                            currentObj[key] =
                                                                fieldObject.type ===
                                                                "text"
                                                                    ? ""
                                                                    : fieldObject.type ===
                                                                          "boolean" ||
                                                                      fieldObject.type ===
                                                                          "checkbox" ||
                                                                      fieldObject.type ===
                                                                          "radio"
                                                                    ? false
                                                                    : [];
                                                        } else if (
                                                            !fieldObject.required &&
                                                            fieldEmpty
                                                        ) {
                                                            delete currentObj[
                                                                key
                                                            ];
                                                        }
                                                    }
                                                }
                                            }
                                        );
                                    };

                                    recursiveClean(obj);
                                    return cleanEmptyFields(obj);
                                };

                                newItem = removeEmptyFields(
                                    newItem,
                                    category.addItemFields
                                );
                            }
                        }
                    );

                    if (category.addUrl) {
                        await addItem(
                            category.addUrl,
                            newItem,
                            null,
                            async (data: any) => {
                                const fieldObject = category.inputFields.find(
                                    (field: any) =>
                                        field.type === "product-image"
                                );

                                if (fieldObject) {
                                    const newItem = await addItem(
                                        fieldObject.postUrl as string,
                                        addImagesFormDataRef.current,
                                        { id: data.id }
                                    );

                                    if (newItem) {
                                        closeProductPhotoAddWindow();
                                    }
                                }
                            }
                        );
                    }
                }
            }
        };

        return (
            <div className="action-modal-buttons">
                {action !== "show" && (
                    <button
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        Закрити
                    </button>
                )}

                <button className={action} onClick={handleSuccess}>
                    {action === "edit"
                        ? "Зберегти"
                        : action === "show"
                        ? "Закрити"
                        : action === "delete"
                        ? "Видалити"
                        : "Додати"}
                </button>
            </div>
        );
    };

    return (
        <>
            {action !== "" && (
                <div
                    className="action-modal-container"
                    onMouseDown={closeModal}
                >
                    <div
                        className={`action-modal${
                            action === "delete" ? " delete" : ""
                        }`}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {action !== "delete" && (
                            <p className="category-action">
                                {category.label} |{" "}
                                {action === "edit"
                                    ? "Редагування"
                                    : action === "show"
                                    ? "Показ"
                                    : "Додавання"}
                            </p>
                        )}
                        <div className="action-modal-content">
                            {action === "delete" ? (
                                getDeleteWindow()
                            ) : action !== "add" ? (
                                <>
                                    {category.inputFields.length > 0 ? (
                                        <>
                                            {category.inputFields.map(
                                                (fieldObject: InputField) => (
                                                    <label
                                                        key={`field[${fieldObject.name}]`}
                                                        htmlFor={
                                                            fieldObject.field_name ||
                                                            fieldObject.name
                                                        }
                                                    >
                                                        {fieldObject.name}

                                                        {getInput(fieldObject)}
                                                    </label>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <Loader />
                                    )}
                                </>
                            ) : (
                                <>
                                    {category &&
                                        category.addItemFields.map(
                                            (itemField: InputField) => (
                                                <label
                                                    key={`addField[${
                                                        itemField.field_name ||
                                                        itemField.name
                                                    }]`}
                                                    htmlFor={
                                                        itemField.field_name ||
                                                        itemField.name
                                                    }
                                                >
                                                    {itemField.name}
                                                    {getInput(itemField)}
                                                </label>
                                            )
                                        )}
                                </>
                            )}

                            {getButtons()}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActionModal;
