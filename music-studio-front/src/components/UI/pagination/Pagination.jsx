import React from 'react';
import {getPagesArray} from "../../../utils/pages";

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages)
    return (
        <div className="page_wrapper">
            {pagesArray.map(pageNumber =>
                <span
                    onClick={() => changePage(pageNumber)}
                    key={pageNumber}
                    className={page === pageNumber ? 'page page_current' : 'page'}
                >
                        {pageNumber}
                    </span>
            )}
        </div>
    );
};

export default Pagination;