import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentAction } from "../redux/actions/currentActionActions";
import { SetDeleteItem } from "../redux/actions/currentDeleteObjectActions";
import {
    AddNotification,
    NotificationBody,
} from "../redux/actions/notificationsActions";
import store from "../redux/store";
import { generateUrl } from "../utils/generateUrl";
import { getItem } from "../utils/getItem";

type ItemActionsProps = {
    id: number;
};

const ItemActions = ({ id }: ItemActionsProps) => {
    const category = useSelector(
        (state: any) => state.categoryReducer.category
    );
    const action = useSelector((state: any) => state.actionReducer.action);
    const dispatch = useDispatch();

    useEffect(() => {}, [action]);

    const sendRequest = async (action: string) => {
        dispatch(SetCurrentAction(action));

        if (action === "delete") {
            dispatch(SetDeleteItem({}));
        }

        await getItem(category.getItemUrl, { id });
    };

    return (
        <td className="actions">
            <button
                className="show"
                onClick={async () => {
                    await sendRequest("show");
                }}
            >
                <svg
                    fill="currentColor"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <path d="m499.4,250.8c-51-86.3-143.6-140.4-243.4-140.4s-192.5,54.1-243.4,140.4c-2.1,3.1-2.1,7.3 5.32907e-15,10.4 51,86.3 143.6,140.4 243.4,140.4s192.5-54.1 243.4-140.4c2.1-3.1 2.1-7.3 0-10.4zm-243.4,130c-90.5,0-174.8-47.8-221.6-124.8 46.8-77 131.1-124.8 221.6-124.8s174.8,47.8 221.6,124.8c-46.8,77-131.1,124.8-221.6,124.8z" />
                    <path d="m256,162.4c-52,0-93.6,41.6-93.6,93.6 0,52 41.6,93.6 93.6,93.6s93.6-41.6 93.6-93.6c0-52-41.6-93.6-93.6-93.6zm0,166.4c-40.6,0-72.8-32.3-72.8-72.8s32.3-72.8 72.8-72.8 72.8,32.3 72.8,72.8-32.2,72.8-72.8,72.8z" />
                    <path d="m256,214.4v20.8c11.4,0 20.8,9.4 20.8,20.8s-9.4,20.8-20.8,20.8-20.8-9.4-20.8-20.8h-20.8c0,22.9 18.7,41.6 41.6,41.6 22.9,0 41.6-18.7 41.6-41.6s-18.7-41.6-41.6-41.6z" />
                </svg>
            </button>
            <button
                className="edit"
                onClick={async () => {
                    await sendRequest("edit");
                }}
            >
                <svg
                    fill="currentColor"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 306.637 306.637"
                    xmlSpace="preserve"
                >
                    <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896    l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z" />
                    <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095    L265.13,75.602L231.035,41.507z" />
                </svg>
            </button>
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
            {category.link === "/orders" && (
                <button
                    className="order-download"
                    onClick={async () => {
                        await axios
                            .get(generateUrl(`/order/download_csv/${id}`))
                            .then((res) => {
                                var encodedUri = encodeURI(
                                    "data:text/csv;charset=utf-8," + res.data
                                );
                                var link = document.createElement("a");

                                if (link) {
                                    link.setAttribute("href", encodedUri);
                                    link.setAttribute(
                                        "download",
                                        `order_${id}.csv`
                                    );
                                    document.body.appendChild(link);

                                    link.click();

                                    link.remove();
                                }
                            })
                            .catch(() => {
                                const error = {
                                    message: `Сталася помилка під час завантяження CSV файлу.`,
                                    type: "error",
                                };

                                store.dispatch(
                                    AddNotification(error as NotificationBody)
                                );
                            });
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            )}
        </td>
    );
};

export default ItemActions;
