import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentAction } from "../redux/actions/currentActionActions";
import "../styles/components/ActionModal.scss";
import Loader from "./Loader";

const ActionModal = () => {
    const action = useSelector((state: any) => state.actionReducer.action);
    const category = useSelector((state: any) => state.categoryReducer.action);
    const item = useSelector((state: any) => state.itemReducer.item);
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(SetCurrentAction(""));
    };

    useEffect(() => {
        console.log(item, action);
    }, [item, action]);

    return (
        <>
            {action !== "" ? (
                <div className="action-modal-container" onClick={closeModal}>
                    <div
                        className="action-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {Object.keys(item).length > 0 ? <></> : <Loader />}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ActionModal;
