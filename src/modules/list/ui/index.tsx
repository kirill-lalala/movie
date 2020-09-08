import React, { useEffect, useState, useCallback } from "react";
import cn from "classnames";
import * as S from "./styles";
import Icon from "../../ud-ui/icon";

interface Params {
  [key: string]: any;
}

const queryString = (params: Params): string => {
  const query = Object.keys(params)
    .map((key: string) => key + "=" + params[key])
    .join("&");
  return query && `?${query}`;
};

const loadData = async (options = {}): Promise<any> => {
  const query = {
    api_key: "4237669ebd35e8010beee2f55fd45546",
    language: "ru-RU",
    ...options,
  };
  const queryParams = queryString(query);
  const BASE_URL = "https://api.themoviedb.org/3/discover/movie";

  try {
    return fetch(`${BASE_URL}${queryParams}`).then((res) => res.json());
  } catch (e) {
    console.log(e);
  }
};

const MoviesList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [favoriteIds, changeFavoriteIds] = useState<number[]>([]);

  const onSuccessFetchData = useCallback((res) => {
    const { results, page, total_pages } = res;
    setData(results);
    setPage(page);
    setTotalPages(total_pages);
  }, []);

  const getMovies = useCallback(async (options = {}) => {
    try {
      setLoading(true);
      await loadData(options).then(onSuccessFetchData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMovies();
  }, []);

  const onNextPageClick = useCallback(() => {
    getMovies({
      page: page + 1,
    });
  }, [page]);

  const onPrevPageClick = useCallback(() => {
    getMovies({
      page: page - 1,
    });
  }, [page]);

  const onToggleFavoriteClick = useCallback(
    (id: number): void => {
      if (favoriteIds.includes(id)) {
        changeFavoriteIds((favoriteIds) =>
          favoriteIds.filter((favoriteId) => favoriteId !== id)
        );
      } else {
        changeFavoriteIds((favoriteIds) => [...favoriteIds, id]);
      }
    },
    [JSON.stringify(favoriteIds)]
  );

  const isNextPageDisable = page === 1;
  const isPrevPageDisable = page === totalPages;

  const containerCN = cn("container", {
    disable: isLoading,
  });

  return (
    <S.Container className={containerCN}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Обложка</th>
            <th scope="col">Название</th>
            <th scope="col">Избранное</th>
          </tr>
        </thead>
        <tbody>
          {data.map((movie) => {
            const { poster_path, title, id } = movie;
            const iconName = favoriteIds.includes(id)
              ? "favorite"
              : "not-favorite";
            return (
              <tr key={id}>
                <td>
                  <img src={poster_path} alt="test" />
                </td>
                <td>{title}</td>
                <td>
                  <Icon
                    name={iconName}
                    onClick={() => onToggleFavoriteClick(id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <S.PaginationControls>
        <button disabled={isNextPageDisable} onClick={onPrevPageClick}>
          {"<"}
        </button>
        <div>{page}</div>
        <button disabled={isPrevPageDisable} onClick={onNextPageClick}>
          {">"}
        </button>
      </S.PaginationControls>
    </S.Container>
  );
};

export default MoviesList;
