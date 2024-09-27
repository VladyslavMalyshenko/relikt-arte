type PaginationProps = {
    currentPage: number;
    changePage: (page: number) => void;
    pages: number;
};

const Pagination = ({ currentPage, changePage, pages }: PaginationProps) => {
    return (
        <div className="buy-products-pagination">
            <div
                className={`buy-products-pagination-button${
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

            {pages > 2 ? (
                <>
                    {currentPage === pages ? (
                        <div
                            className="buy-products-pagination-button"
                            onClick={() => changePage(currentPage - 2)}
                        >
                            {currentPage - 2}
                        </div>
                    ) : currentPage > 1 ? (
                        <div
                            className="buy-products-pagination-button"
                            onClick={() => changePage(currentPage - 1)}
                        >
                            {currentPage - 1}
                        </div>
                    ) : (
                        <div className="buy-products-pagination-button active">
                            {currentPage}
                        </div>
                    )}

                    {currentPage >= pages ? (
                        <div
                            className="buy-products-pagination-button"
                            onClick={() => changePage(currentPage - 1)}
                        >
                            {currentPage - 1}
                        </div>
                    ) : currentPage === 1 ? (
                        <div
                            className="buy-products-pagination-button"
                            onClick={() => changePage(currentPage + 1)}
                        >
                            {currentPage + 1}
                        </div>
                    ) : (
                        <div className="buy-products-pagination-button active">
                            {currentPage}
                        </div>
                    )}

                    {currentPage === 1 ? (
                        <div
                            className="buy-products-pagination-button"
                            onClick={() => changePage(currentPage + 2)}
                        >
                            {currentPage + 2}
                        </div>
                    ) : currentPage < pages ? (
                        <div
                            className="buy-products-pagination-button"
                            onClick={() => changePage(currentPage + 1)}
                        >
                            {currentPage + 1}
                        </div>
                    ) : (
                        <div className="buy-products-pagination-button active">
                            {currentPage}
                        </div>
                    )}
                </>
            ) : pages > 0 ? (
                Array.from({ length: pages }, (_, index) => (
                    <div
                        key={`pagination[${index}]`}
                        className={`buy-products-pagination-button${
                            currentPage === index + 1 ? " active" : ""
                        }`}
                        onClick={() => changePage(index + 1)}
                    >
                        {index + 1}
                    </div>
                ))
            ) : (
                <div className="buy-products-pagination-button active">
                    {currentPage}
                </div>
            )}

            <div
                className={`buy-products-pagination-button${
                    currentPage >= pages ? " disabled" : ""
                }`}
                onClick={() =>
                    currentPage !== pages && pages > 0
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
