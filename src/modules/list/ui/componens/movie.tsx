import React, { FunctionComponent, useState, useCallback, memo } from "react";
import Icon from "../../../ud-ui/icon";

type MovieProps = any;

const Movie: FunctionComponent<MovieProps> = (props) => {
  const { poster_path, original_title, id } = props;

  const [favoriteIds, changeFavoriteIds] = useState<number[]>([]);

  const iconName = favoriteIds.includes(id) ? "favorite" : "not-favorite";

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
    <tr key={id}>
      <td>
        <img src={poster_path} alt="test" />
      </td>
      <td>{original_title}</td>
      <td>
        <Icon name={iconName} onClick={() => onToggleFavoriteClick(id)} />
      </td>
    </tr>
  );
};

export default memo(Movie);
