import { Children, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentAction } from "../redux/actions/currentActionActions";
import { SetCurrentItem } from "../redux/actions/currentItemActions";
import "../styles/components/ActionModal.scss";
import { addItem } from "../utils/addItem";
import { deleteItem } from "../utils/deleteItem";
import { editItem } from "../utils/editItem";
import { getItems } from "../utils/getItems";
import Loader from "./Loader";

const ActionModal = () => {
  const action = useSelector((state: any) => state.actionReducer.action);
  const category = useSelector((state: any) => state.categoryReducer.category);
  const item = useSelector((state: any) => state.itemReducer.item);
  const dispatch = useDispatch();
  const [selectOptions, setSelectOptions] = useState<any>({});
  const [selectedItems, setSelectedItems] = useState<any>({});
  const [fields, setFields] = useState<any>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    const initializeFields = async () => {
      if (!category.main && action !== "" && action !== "delete") {
        const lists = category.addItemFields.filter(
          (field: any) =>
            (field.type === "list" || field.type === "list-radio") &&
            field.getUrl
        );

        for (const list of lists) {
          const options = await getItems(list.getUrl);
          setSelectOptions((prev: any) => ({
            ...prev,
            [list.field_name || list.name]: [...options],
          }));
        }

        const setCheckboxes = (fieldObject: any) => {
          const fieldName = fieldObject.field_name || fieldObject.name;
          setTimeout(() => {
            const listChildren = Array.from(
              document.getElementById(fieldName)?.children || []
            );

            listChildren.forEach((child) => {
              const checkbox: any = child.querySelector(
                'input[type="checkbox"]'
              );
              if (checkbox) {
                const id = +checkbox.parentNode.id.split("[")[1].split("]")[0];
                const isIdSelected = item[fieldName]?.includes(id);
                setSelectedItems((prev: any) => {
                  const updated = { ...prev };
                  if (!updated[fieldName]) {
                    updated[fieldName] = [];
                  }
                  if (isIdSelected) {
                    updated[fieldName].push(id);
                  } else {
                    updated[fieldName] = updated[fieldName].filter(
                      (objectId: any) => objectId !== id
                    );
                  }
                  checkbox.checked = isIdSelected;
                  setValue(fieldName, updated[fieldName]);
                  return updated;
                });
              }
            });
          }, 100);
        };

        if (action !== "add") {
          if (category.inputFields) {
            category.inputFields.forEach((fieldObject: any) => {
              const fieldName = fieldObject.field_name || fieldObject.name;
              const value =
                fieldObject.type === "boolean" ||
                fieldObject.type === "list" ||
                fieldObject.type === "list-radio"
                  ? item[fieldName]
                  : item[fieldName] || "";

              if (fieldObject.type === "list") {
                setCheckboxes(fieldObject);
              }

              if (fieldObject.type === "multiple-field") {
                const nestedValue = fieldName.includes(".")
                  ? fieldName
                      .split(".")
                      .reduce((acc: any, part: any) => acc && acc[part], item)
                  : item[fieldName];

                const formattedFields = nestedValue
                  ? nestedValue.map((val: any, index: any) => ({
                      id: `${fieldName}[${index}]`,
                      value: val,
                    }))
                  : [{ id: `${fieldName}[0]`, value: "" }];

                setFields((prev: any) => ({
                  ...prev,
                  [fieldName]: formattedFields,
                }));
              }

              setValue(fieldName, value);
            });
          }

          if (category.addItemFields) {
            category.addItemFields.forEach((itemField: any) => {
              const fieldName = itemField.field_name || itemField.name;
              const value =
                itemField.type === "boolean" || itemField.type === "list"
                  ? item[fieldName]
                  : item[fieldName] || "";

              if (itemField.type === "list") {
                setCheckboxes(itemField);
              }

              if (itemField.type === "multiple-field") {
                const nestedValue = fieldName.includes(".")
                  ? fieldName
                      .split(".")
                      .reduce((acc: any, part: any) => acc && acc[part], item)
                  : item[fieldName];

                const formattedFields = nestedValue
                  ? nestedValue.map((val: any, index: any) => ({
                      id: `${fieldName}[${index}]`,
                      value: val,
                    }))
                  : [{ id: `${fieldName}[0]`, value: "" }];

                setFields((prev: any) => ({
                  ...prev,
                  [fieldName]: formattedFields,
                }));
              }

              setValue(fieldName, value);
            });
          }
        } else {
          if (category.inputFields) {
            category.inputFields.forEach((fieldObject: any) => {
              const fieldName = fieldObject.field_name || fieldObject.name;
              const value =
                typeof item[fieldObject.field_name || fieldObject.name] ===
                "boolean"
                  ? false
                  : "";

              if (fieldObject.type === "multiple-field") {
                setFields((prev: any) => ({
                  ...prev,
                  [fieldName]: [{ id: `${fieldName}[0]`, value: "" }],
                }));
              }

              setValue(fieldName, value);
            });
          }

          if (category.addItemFields) {
            category.addItemFields.forEach((itemField: any) => {
              const fieldName = itemField.field_name || itemField.name;
              const value = itemField.type === "boolean" ? false : "";

              if (itemField.type === "multiple-field") {
                setFields((prev: any) => ({
                  ...prev,
                  [fieldName]: [{ id: `${fieldName}[0]`, value: "" }],
                }));
              }

              setValue(fieldName, value);
            });
          }

          reset();
        }
      }
    };

    initializeFields();
  }, [item, action, category, setValue]);

  const closeModal = () => {
    dispatch(SetCurrentAction(""));
    dispatch(SetCurrentItem({}));
    setSelectedItems({});
    setSelectOptions({});
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
        При видаленні об'єкту з номером {item.id}, його не можна буде повернути.
        Ці дії НЕ ЗВОРОТНІ!
      </p>
      <p>Ви дійсно хочете видалити {item.id}?</p>
    </>
  );

  const getInput = (fieldObject: any) => {
    const fieldName = fieldObject.field_name || fieldObject.name;

    return (fieldObject.type === "list" || fieldObject.type === "list-radio") &&
      fieldObject.getUrl ? (
      <ul className="list-input" id={fieldName}>
        {selectOptions[fieldName]?.length > 0 &&
          selectOptions[fieldName].map((option: any) => (
            <li key={option.id} id={`${fieldName}[${option.id}]`}>
              <input
                name={fieldObject.field_name}
                type={fieldObject.type === "list" ? "checkbox" : "radio"}
                {...(action !== "add"
                  ? {
                      disabled:
                        action === "show" ||
                        action === "delete" ||
                        fieldObject.locked,
                    }
                  : {})}
                onChange={(e) => {
                  setSelectedItems((prev: any) => {
                    const updated = {
                      ...prev,
                    };

                    if (fieldObject.type === "list") {
                      if (!updated[fieldName]) {
                        updated[fieldName] = [];
                      }
                      if (e.target.checked) {
                        updated[fieldName].push(option.id);
                      } else {
                        updated[fieldName] = updated[fieldName].filter(
                          (id: any) => id !== option.id
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
              {option[fieldObject.labelField]}
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
                  const updatedFields = prevFields[fieldName].map(
                    (prevField: any) => {
                      return prevField.id === field.id
                        ? { ...prevField, value: newValue }
                        : prevField;
                    }
                  );

                  const updated = { ...prevFields, [fieldName]: updatedFields };

                  setSelectedItems((prev: any) => {
                    const updatedSelected = { ...prev };
                    if (!updatedSelected[fieldName]) {
                      updatedSelected[fieldName] = [];
                    }
                    if (newValue) {
                      updatedSelected[fieldName] = [
                        ...updatedSelected[fieldName].filter(
                          (value: any) => value !== field.value
                        ),
                        newValue,
                      ];
                    } else {
                      updatedSelected[fieldName] = updatedSelected[
                        fieldName
                      ].filter((value: any) => value !== field.value);
                    }
                    setValue(fieldName, updatedSelected[fieldName]);
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

                console.log(data);

                return data;
              });
            }}
          >
            Add new field!
          </button>
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
    const handleSuccess = (data: any) => {
      delete data.field;

      if (action === "show") {
        closeModal();
      } else if (action === "edit") {
        const prepareItem = (obj: any, categoryFields: any) => {
          const cleanObj = { ...obj };

          const isFieldInCategory = (fieldName: any) =>
            categoryFields.some(
              (field: any) => (field.field_name || field.name) === fieldName
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
                recursiveClean(value, fullPath);

                if (Object.keys(currentObj[key]).length === 0) {
                  delete currentObj[key];
                }
              } else {
                if (
                  (value && !isFieldInCategory(fullPath)) ||
                  item[key] === value ||
                  value === undefined ||
                  value === null ||
                  value === "" ||
                  (typeof value === "object" && Object.keys(value).length === 0)
                ) {
                  delete currentObj[key];
                }
              }
            });
          };

          recursiveClean(cleanObj);
          return cleanObj;
        };

        const newItem = prepareItem(data, category.addItemFields);

        editItem(category.editUrl, newItem, {
          id: item.id,
        });
      } else if (action === "delete") {
        deleteItem(category.deleteUrl, {
          id: item.id,
        });
      } else if (action === "add") {
        let newItem = { ...data };

        category.addItemFields.forEach((fieldObject: any) => {
          const itemKey = fieldObject.field_name || fieldObject.name;

          if (
            (newItem[itemKey] &&
              !category.addItemFields.some(
                (field: any) => (field.field_name || field.name) === itemKey
              )) ||
            newItem[itemKey] === undefined ||
            newItem[itemKey] === null ||
            newItem[itemKey] === ""
          ) {
            delete newItem[itemKey];
          }
        });

        addItem(category.addUrl, newItem);
      }
    };

    const handleError = (invalidFields: any) => {
      const invalidFieldsNames = Object.keys(invalidFields);
      const existingFields = category.inputFields;

      existingFields.forEach((fieldObject: any) => {
        const fieldName = fieldObject.field_name || fieldObject.name;

        const field = document.querySelector(`input[name="${fieldName}"]`);

        if (field) {
          if (invalidFieldsNames.includes(fieldName)) {
            field.classList.add("invalid");
          } else {
            field.classList.remove("invalid");
          }
        }
      });
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

        <button
          className={action}
          onClick={handleSubmit(handleSuccess, handleError)}
        >
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
        <div className="action-modal-container" onMouseDown={closeModal}>
          <div
            className={`action-modal${action === "delete" ? " delete" : ""}`}
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
                      {category.inputFields.map((fieldObject: any) => (
                        <label
                          key={`field[${fieldObject.name}]`}
                          htmlFor={fieldObject.field_name || fieldObject.name}
                        >
                          {fieldObject.name}

                          {getInput(fieldObject)}
                        </label>
                      ))}
                    </>
                  ) : (
                    <Loader />
                  )}
                </>
              ) : (
                <>
                  {category &&
                    category.addItemFields.map((itemField: any) => (
                      <label
                        key={`addField[${
                          itemField.field_name || itemField.name
                        }]`}
                        htmlFor={itemField.field_name || itemField.name}
                      >
                        {itemField.name}
                        {getInput(itemField)}
                      </label>
                    ))}
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
