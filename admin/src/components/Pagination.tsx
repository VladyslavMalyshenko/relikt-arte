import { useDispatch, useSelector } from "react-redux";
import { SetCurrentPage } from "../redux/actions/currentPageActions";
import "../styles/components/Content.scss";

const Pagination = () => {
    const currentPage = useSelector(
        (state: any) => state.pageReducer.currentPage
    );
    const availablePages = useSelector(
        (state: any) => state.pageReducer.availablePages
    );
    const dispatch = useDispatch();

    const changePage = (page: number) => {
        dispatch(SetCurrentPage(page));
    };

    return (
        <div className="pagination">
            <div
                className={`pagination-button${
                    currentPage === 1 ? " disabled" : ""
                }`}
                onClick={() =>
                    currentPage !== 1 ? changePage(currentPage - 1) : null
                }
            >
                <svg
                    width="6"
                    height="14"
                    viewBox="0 0 6 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.33301 1.16675L0.666341 7.00008L5.33301 12.8334"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {availablePages > 2 ? (
                <>
                    {currentPage === availablePages ? (
                        <div
                            className="pagination-button"
                            onClick={() => changePage(currentPage - 2)}
                        >
                            {currentPage - 2}
                        </div>
                    ) : currentPage > 1 ? (
                        <div
                            className="pagination-button"
                            onClick={() => changePage(currentPage - 1)}
                        >
                            {currentPage - 1}
                        </div>
                    ) : (
                        <div className="pagination-button active">
                            {currentPage}
                        </div>
                    )}

                    {currentPage >= availablePages ? (
                        <div
                            className="pagination-button"
                            onClick={() => changePage(currentPage - 1)}
                        >
                            {currentPage - 1}
                        </div>
                    ) : currentPage === 1 ? (
                        <div
                            className="pagination-button"
                            onClick={() => changePage(currentPage + 1)}
                        >
                            {currentPage + 1}
                        </div>
                    ) : (
                        <div className="pagination-button active">
                            {currentPage}
                        </div>
                    )}

                    {currentPage === 1 ? (
                        <div
                            className="pagination-button"
                            onClick={() => changePage(currentPage + 2)}
                        >
                            {currentPage + 2}
                        </div>
                    ) : currentPage < availablePages ? (
                        <div
                            className="pagination-button"
                            onClick={() => changePage(currentPage + 1)}
                        >
                            {currentPage + 1}
                        </div>
                    ) : (
                        <div className="pagination-button active">
                            {currentPage}
                        </div>
                    )}
                </>
            ) : availablePages > 0 ? (
                Array.from({ length: availablePages }, (_, index) => (
                    <div
                        key={`pagination[${index}]`}
                        className={`pagination-button${
                            currentPage === index + 1 ? " active" : ""
                        }`}
                        onClick={() => changePage(index + 1)}
                    >
                        {index + 1}
                    </div>
                ))
            ) : (
                <div className="pagination-button active">{currentPage}</div>
            )}

            <div
                className={`pagination-button${
                    currentPage >= availablePages ? " disabled" : ""
                }`}
                onClick={() =>
                    currentPage !== availablePages && availablePages > 0
                        ? changePage(currentPage + 1)
                        : null
                }
            >
                <svg
                    width="6"
                    height="14"
                    viewBox="0 0 6 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0.666016 12.8333L5.33268 6.99992L0.666017 1.16658"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Pagination;
