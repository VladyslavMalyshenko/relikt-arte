import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Notification as NotificationType,
    RemNotification,
} from "../redux/actions/notificationsActions";
import "../styles/components/Notifications.scss";

type NotificationProps = {
    notification: NotificationType;
    index: number;
};

const Notification = ({ notification, index }: NotificationProps) => {
    const animationTime = 10;
    const delay = 1000;
    const dispatch = useDispatch();

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(RemNotification(notification.id));
        }, animationTime * 1000 + index * delay - 400);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <p
            className="notification"
            style={{
                animationDelay: `${index * delay}ms`,
                animationDuration: `${animationTime}s`,
            }}
        >
            {notification.type === "error" ? (
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 50 50"
                    xmlSpace="preserve"
                >
                    <circle
                        style={{ fill: "#D75A4A" }}
                        cx="25"
                        cy="25"
                        r="25"
                    />
                    <polyline
                        style={{
                            fill: "none",
                            stroke: "#FFFFFF",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                        }}
                        points="16,34 25,25 34,16   "
                    />
                    <polyline
                        style={{
                            fill: "none",
                            stroke: "#FFFFFF",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeMiterlimit: "10",
                        }}
                        points="16,16 25,25 34,34   "
                    />
                </svg>
            ) : (
                <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 50 50"
                    xmlSpace="preserve"
                >
                    <circle
                        cx={25}
                        cy={25}
                        r={25}
                        style={{ fill: "#25AE88" }}
                    />
                    <polyline
                        style={{
                            fill: "none",
                            stroke: "#FFFFFF",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                        }}
                        points="  38,15 22,33 12,25 "
                    />
                </svg>
            )}
            {notification.message}
        </p>
    );
};

const Notifications = () => {
    const notifications = useSelector(
        (state: any) => state.notificationsReducer.notifications
    );

    useEffect(() => {
        console.log(notifications);
    }, [notifications]);

    return (
        <div className="notifications">
            {notifications.map(
                (notification: NotificationType, index: number) => (
                    <Notification
                        key={`notification[${notification.id}]`}
                        notification={notification}
                        index={index}
                    />
                )
            )}
        </div>
    );
};

export default Notifications;
