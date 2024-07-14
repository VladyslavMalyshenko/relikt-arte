import { useDispatch, useSelector } from "react-redux";
import { SetCurrentAction } from "../redux/actions/currentActionActions";
import { SetCurrentItem } from "../redux/actions/currentItemActions";
import "../styles/components/ActionModal.scss";
import { addItem } from "../utils/addItem";
import { deleteItem } from "../utils/deleteItem";
import { editItem } from "../utils/editItem";
import Loader from "./Loader";

const ActionModal = () => {
    const action = useSelector((state: any) => state.actionReducer.action);
    const category = useSelector(
        (state: any) => state.categoryReducer.category
    );
    const item = useSelector((state: any) => state.itemReducer.item);
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(SetCurrentAction(""));
        dispatch(SetCurrentItem({}));
    };

    return (
        <>
            {action !== "" && (
                <div className="action-modal-container" onClick={closeModal}>
                    <div
                        className={`action-modal${
                            action === "delete" ? " delete" : ""
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="action-modal-content">
                            {action === "delete" ? (
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
                                        {item.id}, його не можна буде повернути.
                                        Ці дії НЕ ЗВОРОТНІ!
                                    </p>
                                    <p>Ви дійсно хочете видалити {item.id}?</p>
                                </>
                            ) : action !== "add" ? (
                                <>
                                    {category.inputFields.length > 0 ? (
                                        <>
                                            {category.inputFields.map(
                                                (fieldObject: any) => (
                                                    <label
                                                        key={`field[${fieldObject.name}]`}
                                                        htmlFor={`field[${
                                                            fieldObject.field_name ||
                                                            fieldObject.name
                                                        }]`}
                                                    >
                                                        {fieldObject.name}
                                                        <input
                                                            name={`field[${
                                                                fieldObject.field_name ||
                                                                fieldObject.name
                                                            }]`}
                                                            readOnly={
                                                                ((action ===
                                                                    "show" ||
                                                                    action ===
                                                                        "delete") &&
                                                                    typeof item[
                                                                        fieldObject.field_name ||
                                                                            fieldObject.name
                                                                    ] !==
                                                                        "boolean") ||
                                                                (fieldObject.field_name ||
                                                                    fieldObject.name) ===
                                                                    "id" ||
                                                                fieldObject.locked
                                                            }
                                                            disabled={
                                                                ((action ===
                                                                    "show" ||
                                                                    action ===
                                                                        "delete") &&
                                                                    typeof item[
                                                                        fieldObject.field_name ||
                                                                            fieldObject.name
                                                                    ] ===
                                                                        "boolean") ||
                                                                fieldObject.locked
                                                            }
                                                            type={
                                                                typeof item[
                                                                    fieldObject.field_name ||
                                                                        fieldObject.name
                                                                ] === "boolean"
                                                                    ? "checkbox"
                                                                    : "text"
                                                            }
                                                            placeholder={
                                                                fieldObject.name
                                                            }
                                                            {...(typeof item[
                                                                fieldObject.field_name ||
                                                                    fieldObject.name
                                                            ] === "boolean"
                                                                ? {
                                                                      checked:
                                                                          item[
                                                                              fieldObject.field_name ||
                                                                                  fieldObject.name
                                                                          ] ||
                                                                          false,
                                                                      onChange:
                                                                          (e) =>
                                                                              dispatch(
                                                                                  SetCurrentItem(
                                                                                      {
                                                                                          ...item,
                                                                                          [fieldObject.field_name ||
                                                                                          fieldObject.name]:
                                                                                              e
                                                                                                  .target
                                                                                                  .checked,
                                                                                      }
                                                                                  )
                                                                              ),
                                                                  }
                                                                : {
                                                                      onChange:
                                                                          (e) =>
                                                                              dispatch(
                                                                                  SetCurrentItem(
                                                                                      {
                                                                                          ...item,
                                                                                          [fieldObject.field_name ||
                                                                                          fieldObject.name]:
                                                                                              e
                                                                                                  .target
                                                                                                  .value,
                                                                                      }
                                                                                  )
                                                                              ),
                                                                      value:
                                                                          item[
                                                                              fieldObject.field_name ||
                                                                                  fieldObject.name
                                                                          ] ||
                                                                          "",
                                                                  })}
                                                        />
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
                                            (itemField: any) => (
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
                                                    <input
                                                        name={
                                                            itemField.field_name ||
                                                            itemField.name
                                                        }
                                                        placeholder={
                                                            itemField.name
                                                        }
                                                        type={
                                                            itemField.type ||
                                                            "text"
                                                        }
                                                        {...(itemField.type ===
                                                        "boolean"
                                                            ? {
                                                                  onChange: (
                                                                      e
                                                                  ) =>
                                                                      dispatch(
                                                                          SetCurrentItem(
                                                                              {
                                                                                  ...item,
                                                                                  [itemField.field_name ||
                                                                                  itemField.name]:
                                                                                      e
                                                                                          .target
                                                                                          .checked,
                                                                              }
                                                                          )
                                                                      ),
                                                              }
                                                            : {
                                                                  onChange: (
                                                                      e
                                                                  ) =>
                                                                      dispatch(
                                                                          SetCurrentItem(
                                                                              {
                                                                                  ...item,
                                                                                  [itemField.field_name ||
                                                                                  itemField.name]:
                                                                                      e
                                                                                          .target
                                                                                          .value,
                                                                              }
                                                                          )
                                                                      ),
                                                              })}
                                                    />
                                                </label>
                                            )
                                        )}
                                </>
                            )}

                            <div className="action-modal-buttons">
                                {action !== "show" && (
                                    <button
                                        onClick={() => {
                                            closeModal();
                                        }}
                                    >
                                        Close
                                    </button>
                                )}

                                <button
                                    className={action}
                                    onClick={() => {
                                        if (action === "show") {
                                            closeModal();
                                        } else if (action === "edit") {
                                            let newItem = { ...item };

                                            Object.keys(newItem).forEach(
                                                (itemKey) => {
                                                    if (
                                                        newItem[itemKey] &&
                                                        !category.addItemFields.some(
                                                            (field: any) =>
                                                                (field.field_name ||
                                                                    field.name) ===
                                                                itemKey
                                                        )
                                                    ) {
                                                        delete newItem[itemKey];
                                                    }
                                                }
                                            );

                                            editItem(
                                                category.editUrl,
                                                newItem,
                                                { id: item.id }
                                            );
                                        } else if (action === "delete") {
                                            deleteItem(category.deleteUrl, {
                                                id: item.id,
                                            });
                                        } else if (action === "add") {
                                            let newItem = { ...item };

                                            Object.keys(newItem).forEach(
                                                (itemKey) => {
                                                    if (!newItem[itemKey]) {
                                                        const fieldType =
                                                            category.addItemFields.find(
                                                                (field: any) =>
                                                                    (field.field_name ||
                                                                        field.name) ===
                                                                    itemKey
                                                            ).type;
                                                        newItem[itemKey] =
                                                            fieldType ===
                                                                "checkbox" ||
                                                            fieldType ===
                                                                "radio"
                                                                ? false
                                                                : "";
                                                    } else if (
                                                        newItem[itemKey] &&
                                                        !category.addItemFields.some(
                                                            (field: any) =>
                                                                (field.field_name ||
                                                                    field.name) ===
                                                                itemKey
                                                        )
                                                    ) {
                                                        delete newItem[itemKey];
                                                    }
                                                }
                                            );

                                            addItem(category.addUrl, newItem);
                                        }
                                    }}
                                >
                                    {action === "edit"
                                        ? "Save"
                                        : action === "show"
                                        ? "Close"
                                        : action === "delete"
                                        ? "Delete"
                                        : "Add"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActionModal;
