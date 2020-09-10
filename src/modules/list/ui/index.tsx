import React, { useEffect, useState, useCallback } from "react";
import cn from "classnames";
import * as S from "./styles";
import MovieListItem from "./componens/movie-list-item";
import PaginationControls from "../../ud-ui/pagination-controls";
import { loadMoviesData, loadGenres, Genre } from "../store";
import SortArrows from "./componens/sort-arrows";
import Select from "../../ud-ui/select";

export type Filters = {
  sort_by: string;
  with_genres?: number;
};

type MoviesListProps = {
  config: any;
};

const headerTableData = [
  {
    title: "Обложка",
  },
  {
    title: "Название",
    sortBy: "original_title",
  },
  {
    title: "Популярность",
    sortBy: "popularity",
  },
  {
    title: "Рейтинг",
    sortBy: "vote_average",
  },
  {
    title: "Дата релиза",
    sortBy: "primary_release",
  },
  {
    title: "Избранное",
  },
];

const MoviesList = (props: MoviesListProps) => {
  const { config } = props;

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [genres, setGenres] = useState<Genre[] | undefined>(undefined);
  const [filters, changeFilters] = useState<Filters>({
    sort_by: "popularity.desc",
  });

  const changeFilter = useCallback((key: keyof Filters) => {
    return (value: any) => {
      changeFilters((prev) => {
        let updatedFilters = { ...prev, [key]: value };
        if (value == null) delete updatedFilters[key];
        getMovies(updatedFilters);
        return updatedFilters;
      });
    };
  }, []);

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
        const data = await loadMoviesData({
          ...filters,
          ...options,
        });
        await onSuccessFetchData(data);
      } finally {
        setLoading(false);
      }
    },
    [JSON.stringify(filters)]
  );

  useEffect(() => {
    getMovies();
    loadGenres().then((genres) => {
      setGenres(genres);
    });
  }, []);

  const onGenreChange = useCallback((id) => {
    changeFilter("with_genres")(id);
  }, []);
  const onChangeSort = useCallback((key: string) => {
    changeFilter("sort_by")(key);
  }, []);

  const containerCN = cn("container", {
    disable: isLoading,
  });

  return (
    <S.Container className={containerCN}>
      <Select
        label={"Genres"}
        options={genres}
        onChange={onGenreChange}
        value={filters?.with_genres}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            {headerTableData.map((item: any) => (
              <S.Th scope="col" key={item.name}>
                <S.ThContent>
                  {item.title}
                  {!!item.sortBy && (
                    <SortArrows
                      sortBy={item.sortBy}
                      changeSort={onChangeSort}
                      currentSort={filters.sort_by}
                    />
                  )}
                </S.ThContent>
              </S.Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((movie: any) => (
            <MovieListItem {...movie} key={movie.id} config={config} />
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
