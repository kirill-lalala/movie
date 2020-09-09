import React, { FunctionComponent, useCallback, useState, memo } from "react";
import * as S from "./styles";
import Icon from "../../../../ud-ui/icon";

type MovieProps = {
  sortBy: "original_title";
  changeSort: (arg: string) => void;
  currentSort: string;
};

const icons = [{ direction: "asc" }, { direction: "desc" }];

const SortArrows: FunctionComponent<MovieProps> = (props) => {
  const { sortBy, changeSort, currentSort } = props;

  const onAscArrowClick = useCallback((direction: string) => {
    const sortDirection = `${sortBy}.${direction}`;
    changeSort(sortDirection);
  }, []);

  let ascIconName: "sort-arrow" | "sort-arrow-active" = "sort-arrow";
  let descIconName: "sort-arrow" | "sort-arrow-active" = "sort-arrow";
  const [currentActiveSortColumn, direction] = currentSort.split(".");
  if (currentActiveSortColumn === sortBy) {
    if (direction === "asc") {
      ascIconName = "sort-arrow-active";
    } else {
      descIconName = "sort-arrow-active";
    }
  }

  return (
    <div>
      <S.RotateIcon>
        <Icon name={ascIconName} onClick={() => onAscArrowClick("asc")} />
      </S.RotateIcon>

      <div>
        <Icon name={descIconName} onClick={() => onAscArrowClick("desc")} />
      </div>
    </div>
  );
};

export default memo(SortArrows);
