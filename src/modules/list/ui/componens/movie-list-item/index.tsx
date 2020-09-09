import React, { FunctionComponent, useState, useCallback, memo } from "react";
import Icon from "../../../../ud-ui/icon";
import { useHistory } from "react-router-dom";
import * as S from "./styles";

type MovieProps = any;

const getImageSrc = (path: string) => {
  const { images } = JSON.parse(localStorage.getItem("config") as string);
  const { base_url, poster_sizes } = images;
  return `${base_url}${poster_sizes[0]}${path}`;
};

const MovieListItem: FunctionComponent<MovieProps> = (props) => {
  const { poster_path, original_title, id } = props;

  const history = useHistory();

  const [favoriteIds, changeFavoriteIds] = useState<number[]>([]);

  const iconName = favoriteIds.includes(id) ? "favorite" : "not-favorite";

  const src = getImageSrc(poster_path);

  const onRowClick = useCallback(() => {
    history.push(`/${id}`, props);
  }, [id, JSON.stringify(props)]);

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
      <td>
        <Icon name={iconName} onClick={() => onToggleFavoriteClick(id)} />
      </td>
    </S.Tr>
  );
};

export default memo(MovieListItem);
