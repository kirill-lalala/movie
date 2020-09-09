import React, { useEffect, useState, useCallback } from "react";
import cn from "classnames";
import * as S from "./styles";
import MovieListItem from "./componens/movie-list-item";
import PaginationControls from "../../ud-ui/pagination-controls";
import { loadData } from "../store";
import SortArrows from "./componens/sort-arrows";
import { Link, Router } from "react-router-dom";

const headerTableData = [
  {
    title: "Название",
  },
  {
    title: "Обложка",
    sortBy: "original_title",
  },
  {
    title: "Избранное",
  },
];

const MoviesList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [currentSort, changeCurrentSort] = useState("original_title.asc");

  const onSuccessFetchData = useCallback((res) => {
    const { results, page, total_pages } = res;
    setData(results);
    setPage(page);
    setTotalPages(total_pages);
  }, []);

  const getMovies = useCallback(
    async (options = {}) => {
      try {
        setLoading(true);
        await loadData({
          sort_by: currentSort,
          ...options,
        }).then(onSuccessFetchData);
      } finally {
        setLoading(false);
      }
    },
    [currentSort]
  );

  useEffect(() => {
    getMovies();
  }, []);

  const containerCN = cn("container", {
    disable: isLoading,
  });

  return (
    <S.Container className={containerCN}>
      <table className="table">
        <thead>
          <tr>
            {headerTableData.map((item: any) => (
              <S.Th scope="col" key={item.name}>
                <S.ThContent>
                  {item.title}
                  {!!item.sortBy && (
                    <SortArrows
                      load={getMovies}
                      sortBy={item.sortBy}
                      changeSort={changeCurrentSort}
                      currentSort={currentSort}
                    />
                  )}
                </S.ThContent>
              </S.Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((movie: any) => (
            <MovieListItem {...movie} key={movie.id} />
          ))}
        </tbody>
      </table>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        load={getMovies}
      />
    </S.Container>
  );
};

export default MoviesList;
