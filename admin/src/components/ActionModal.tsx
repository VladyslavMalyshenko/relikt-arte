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
                        className="action-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="action-modal-content">
                            {action !== "add" ? (
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
                                                                          ],
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
                                                                      value: item[
                                                                          fieldObject.field_name ||
                                                                              fieldObject.name
                                                                      ],
                                                                  })}
                                                        />
                                                    </label>
                                                )
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
                                                        } else if (
                                                            action === "edit"
                                                        ) {
                                                            editItem(
                                                                category.editUrl,
                                                                {
                                                                    ...item,
                                                                    id: undefined,
                                                                },
                                                                { id: item.id }
                                                            );
                                                        } else {
                                                            deleteItem(
                                                                category.deleteUrl,
                                                                {
                                                                    id: item.id,
                                                                }
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {action === "edit"
                                                        ? "Save"
                                                        : action === "show"
                                                        ? "Close"
                                                        : "Delete"}
                                                </button>
                                            </div>
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
                                    <div className="action-modal-buttons">
                                        <button
                                            onClick={() => {
                                                closeModal();
                                            }}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className={action}
                                            onClick={() => {
                                                let newItem = item;

                                                category.addItemFields.forEach(
                                                    (itemField: any) => {
                                                        if (
                                                            !newItem[
                                                                itemField.field_name ||
                                                                    itemField.name
                                                            ]
                                                        ) {
                                                            newItem[
                                                                itemField.field_name ||
                                                                    itemField.name
                                                            ] =
                                                                itemField.type ===
                                                                    "checkbox" ||
                                                                itemField.type ===
                                                                    "radio"
                                                                    ? false
                                                                    : "";
                                                        }
                                                    }
                                                );
                                                addItem(
                                                    category.addUrl,
                                                    newItem
                                                );
                                            }}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActionModal;
