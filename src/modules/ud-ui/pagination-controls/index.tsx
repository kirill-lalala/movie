import React, { FunctionComponent, useCallback } from "react";
import * as S from "./styles";

const PaginationControls: FunctionComponent<any> = (props) => {
  const { page, totalPages, load } = props;

  const onNextPageClick = useCallback(
    (e) => {
      e.preventDefault();
      load({
        page: page + 1,
      });
    },
    [page]
  );

  const onPrevPageClick = useCallback(
    (e) => {
      e.preventDefault();
      load({
        page: page - 1,
      });
    },
    [page]
  );

  const isPrevPageDisable = page === 1;
  const isNextPageDisable = page === totalPages;
  return (
    // <S.PaginationControls>
    //   <button disabled={isNextPageDisable} onClick={onPrevPageClick}>
    //     {"<"}
    //   </button>
    //   <div>{page}</div>
    //   <button disabled={isPrevPageDisable} onClick={onNextPageClick}>
    //     {">"}
    //   </button>
    // </S.PaginationControls>
    <S.PaginationControls>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <S.Button
              className={`page-link ${isPrevPageDisable ? "disabled" : ""}`}
              disabled={isPrevPageDisable}
              onClick={onPrevPageClick}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </S.Button>
          </li>
          <li className="page-item">
            <span className="page-link">{page}</span>
          </li>
          <li className="page-item">
            <S.Button
              className={`page-link ${isNextPageDisable ? "disabled" : ""}`}
              onClick={onNextPageClick}
              disabled={isNextPageDisable}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </S.Button>
          </li>
        </ul>
      </nav>
    </S.PaginationControls>
  );
};

export default PaginationControls;
