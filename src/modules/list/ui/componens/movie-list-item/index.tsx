import React, { FunctionComponent, useState, useCallback, memo } from "react";
import Icon from "../../../../ud-ui/icon";
import { useHistory } from "react-router-dom";
import * as S from "./styles";

type MovieProps = any;

const getImageSrc = (config: any, path: string) => {
  if (config) {
    const { images } = config;
    const { base_url, poster_sizes } = images;
    return `${base_url}${poster_sizes[0]}${path}`;
  }
  return "";
};

const MovieListItem: FunctionComponent<MovieProps> = (props) => {
  const {
    poster_path,
    original_title,
    popularity,
    vote_average,
    release_date,
    id,
    config,
  } = props;

  const history = useHistory();

  const [favoriteIds, changeFavoriteIds] = useState<number[]>([]);

  const iconName = favoriteIds.includes(id) ? "favorite" : "not-favorite";

  const src = getImageSrc(config, poster_path);

  const onRowClick = useCallback(() => {
    history.push(`/${id}`, { ...props, ...config });
  }, [id, JSON.stringify(props), JSON.stringify(config)]);

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

  return (
    <S.Tr key={id} onClick={onRowClick}>
      <td>
        <img src={src} alt={original_title} />
      </td>
      <td>{original_title}</td>
      <td>{popularity}</td>
      <td>{vote_average}</td>
      <td>{release_date}</td>
      <td>
        <Icon
          name={iconName}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavoriteClick(id);
          }}
        />
      </td>
    </S.Tr>
  );
};

export default memo(MovieListItem);
