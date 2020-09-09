import React, { FunctionComponent, useCallback } from "react";
import * as S from "./styles";

const PaginationControls: FunctionComponent<any> = (props) => {
  const { page, totalPages, load } = props;

  const onNextPageClick = useCallback(() => {
    load({
      page: page + 1,
    });
  }, [page]);

  const onPrevPageClick = useCallback(() => {
    load({
      page: page - 1,
    });
  }, [page]);

  const isNextPageDisable = page === 1;
  const isPrevPageDisable = page === totalPages;
  return (
    <S.PaginationControls>
      <button disabled={isNextPageDisable} onClick={onPrevPageClick}>
        {"<"}
      </button>
      <div>{page}</div>
      <button disabled={isPrevPageDisable} onClick={onNextPageClick}>
        {">"}
      </button>
    </S.PaginationControls>
  );
};

export default PaginationControls;
