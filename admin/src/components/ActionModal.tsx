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
    const [productImageOptions, setProductImageOptions] = useState<any>([]);

    const closeProductPhotoAddWindow = () => {
        setIsAddProductImageOpened(false);
        setAddProductImages([]);
        addImagesFormDataRef.current = new FormData();
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
                    chosen: {
                        field: "with_glass",
                        fieldValue: true,
                        target: "glass_color_id",
                        getUrl: "/api/v1/product/related/product_glass_color/list/",
                    },
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
        const getNestedValue = (obj: any, path: string): any => {
            return path.split(".").reduce((acc, part) => acc && acc[part], obj);
        };

        const initializeFields = async (): Promise<void> => {
            if (!category.main && action !== "" && action !== "delete") {
                const lists = category.addItemFields.filter(
                    (field: InputField) =>
                        (field.type === "list" ||
                            field.type === "list-radio") &&
                        field.getUrl
                );

                for (const list of lists) {
                    const options = await getItems(list.getUrl);
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
                                const id = +input
                                    .parentNode!.id.split("[")[1]
                                    .split("]")[0];
                                const isSingleValue =
                                    typeof item[fieldName] === "number";
                                const isIdSelected = isSingleValue
                                    ? item[fieldName] !== undefined &&
                                      item[fieldName] !== null &&
                                      item[fieldName] === id
                                    : getNestedValue(item, fieldName)?.includes(
                                          id
                                      );

                                setSelectedItems((prev: any) => {
                                    const updated = { ...prev };
                                    if (!updated[fieldName]) {
                                        updated[fieldName] = [];
                                    }

                                    if (isIdSelected) {
                                        if (isSingleValue) {
                                            updated[fieldName] = id;
                                        } else {
                                            updated[fieldName].push(id);
                                        }
                                    } else {
                                        if (
                                            !isSingleValue &&
                                            Array.isArray(updated[fieldName])
                                        ) {
                                            updated[fieldName] = updated[
                                                fieldName
                                            ].filter(
                                                (objectId: any) =>
                                                    objectId !== id
                                            );
                                        }
                                    }

                                    input.checked = isIdSelected;
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
            fieldObject.getUrl ? (
            <ul className="list-input" id={fieldName}>
                {selectOptions[fieldName]?.length > 0 &&
                    selectOptions[fieldName].map((option: any) => (
                        <li key={option.id} id={`${fieldName}[${option.id}]`}>
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
                                                    (id: any) =>
                                                        id !== option.id
                                                );
                                            }
                                        } else {
                                            if (!updated[fieldName]) {
                                                updated[fieldName] = 0;
                                            }
                                            if (e.target.checked) {
                                                updated[fieldName] = option.id;
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
                                            ? { ...prevField, value: newValue }
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
                        Add new field!
                    </button>
                )}
            </>
        ) : fieldObject.type === "product-image" ? (
            <>
                <button onClick={() => setIsProductImageOpened(true)}>
                    See files
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
                            <div className="action-modal-content">
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
                                <button
                                    className="add"
                                    onClick={() =>
                                        setIsAddProductImageOpened(true)
                                    }
                                >
                                    Додати
                                </button>

                                <div className="action-modal-buttons">
                                    <button
                                        className={"show"}
                                        onClick={() =>
                                            setIsProductImageOpened(false)
                                        }
                                    >
                                        Закрити
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isAddProductImageOpened && (
                    <div
                        onMouseDown={closeProductPhotoAddWindow}
                        className="action-modal-container no-background"
                    >
                        <div
                            className="action-modal"
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <div className="action-modal-content">
                                {addProductImages.length > 0 &&
                                    addProductImages.map(
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
                                    Add new image
                                </button>
                                <div className="action-modal-buttons">
                                    <button
                                        className={"show"}
                                        onClick={closeProductPhotoAddWindow}
                                    >
                                        Закрити
                                    </button>

                                    <button
                                        className={"add"}
                                        onClick={async () => {
                                            const newItem = await addItem(
                                                fieldObject.postUrl as string,
                                                addImagesFormDataRef.current,
                                                { id: item.id }
                                            );

                                            if (newItem) {
                                                setIsProductImageOpened(false);
                                                closeProductPhotoAddWindow();
                                            }
                                        }}
                                    >
                                        Додати
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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
            const data = getValues();
            const isAnyError = await handleErrors();

            if (action === "show") {
                closeModal();

                return;
            } else if (action === "delete") {
                deleteItem(
                    deleteObject?.url || category.deleteUrl,
                    {
                        id: deleteObject?.item?.id || item.id,
                    },
                    "edit"
                );

                if (deleteObject) {
                    dispatch(SetDeleteItem({}));
                }

                if (isProductImageOpened) {
                    setIsProductImageOpened(false);
                }

                return;
            }

            if (!isAnyError) {
                delete data.field;

                if (action === "edit") {
                    const prepareItem = async (
                        obj: any,
                        categoryFields: InputField[],
                        originalItem: any
                    ) => {
                        const cleanObj = { ...obj };

                        const handleProductPhotos = async () => {
                            if (originalItem?.photos) {
                                let newPhotos = productImages.map(
                                    (item: any) => item
                                );

                                newPhotos.forEach(
                                    (newPhoto: any, index: number) => {
                                        const initialPhotoObject =
                                            originalItem.photos.find(
                                                (photo: any) =>
                                                    photo.id === newPhoto.id
                                            );

                                        if (
                                            JSON.stringify(newPhoto) ===
                                            JSON.stringify(initialPhotoObject)
                                        ) {
                                            newPhotos.splice(index, 1);
                                            return;
                                        }

                                        const photoKeys =
                                            Object.keys(initialPhotoObject);

                                        photoKeys.forEach((key: string) => {
                                            if (
                                                key !== "id" &&
                                                newPhoto[key] ===
                                                    initialPhotoObject[key]
                                            ) {
                                                delete newPhoto[key];
                                            }
                                        });
                                    }
                                );

                                newPhotos = newPhotos.filter(
                                    (newPhoto: any) =>
                                        Object.keys(newPhoto).length > 1
                                );

                                const fieldObject = categoryFields.find(
                                    (field) => field.type === "product-image"
                                ) as any;

                                if (fieldObject.updateUrl) {
                                    await bulkEdit(
                                        fieldObject.updateUrl,
                                        newPhotos,
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
                        category.addItemFields,
                        item
                    );

                    editItem(category.editUrl, newItem, {
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

                    addItem(category.addUrl, newItem);
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
