import { useEffect, useState } from "react";
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
    const [itemKeys, setItemKeys] = useState<any>({});
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(SetCurrentAction(""));
    };

    useEffect(() => {
        console.log(item, action);
        setItemKeys(Object.keys(item));
    }, [item, action]);

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
                                    {itemKeys.length > 0 ? (
                                        <>
                                            {itemKeys.map((key: any) => (
                                                <label htmlFor={key}>
                                                    {key}
                                                    <input
                                                        name={key}
                                                        key={key}
                                                        readOnly={
                                                            ((action ===
                                                                "show" ||
                                                                action ===
                                                                    "delete") &&
                                                                typeof item[
                                                                    key
                                                                ] !==
                                                                    "boolean") ||
                                                            key === "id"
                                                        }
                                                        disabled={
                                                            (action ===
                                                                "show" ||
                                                                action ===
                                                                    "delete") &&
                                                            typeof item[key] ===
                                                                "boolean"
                                                        }
                                                        type={
                                                            typeof item[key] ===
                                                            "boolean"
                                                                ? "checkbox"
                                                                : "text"
                                                        }
                                                        placeholder={key}
                                                        {...(typeof item[
                                                            key
                                                        ] === "boolean"
                                                            ? {
                                                                  checked:
                                                                      item[key],
                                                                  onChange: (
                                                                      e
                                                                  ) =>
                                                                      dispatch(
                                                                          SetCurrentItem(
                                                                              {
                                                                                  ...item,
                                                                                  [key]: e
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
                                                                                  [key]: e
                                                                                      .target
                                                                                      .value,
                                                                              }
                                                                          )
                                                                      ),
                                                                  value: item[
                                                                      key
                                                                  ],
                                                              })}
                                                    />
                                                </label>
                                            ))}

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
                                    {category.addItemFields.map(
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
                                                    placeholder={itemField.name}
                                                    type={
                                                        itemField.type || "text"
                                                    }
                                                    {...(itemField.type ===
                                                    "boolean"
                                                        ? {
                                                              onChange: (e) =>
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
                                                              onChange: (e) =>
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
